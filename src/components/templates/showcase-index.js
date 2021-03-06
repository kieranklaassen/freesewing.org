import React, { useEffect } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'

const ShowcaseIndexTemplate = props => {
  useEffect(() => {
    props.app.frontend.setTitle(<FormattedMessage id="app.showcase" />)
  }, [])
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fileAbsolutePath: { regex: "//showcase/[^/]*/en.md/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            parent {
              ... on File {
                relativeDirectory
              }
            }
            excerpt(pruneLength: 100)
            frontmatter {
              title
              date
              author
              patterns
              img {
                childImageSharp {
                  fluid(maxWidth: 400) {
                    base64
                    srcSet
                    sizes
                    presentationWidth
                    presentationHeight
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const style = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    post: {
      width: props.mobile ? '100%' : '47.5%',
      marginBottom: '2rem'
    },
    figure: {
      margin: 0,
      padding: 0
    },
    title: {
      border: 0,
      fontSize: '1.5rem',
      margin: 0,
      padding: 0,
      lineHeight: 1.25
    },
    blurb: {
      fontSize: '1rem',
      margin: 0,
      padding: 0
    },
    link: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }
  if (props.app.frontend.mobile || props.app.frontend.tablet) style.post.width = '100%'

  return (
    <React.Fragment>
      <div style={style.wrapper}>
        {data.allMdx.edges.map(node => {
          let frontmatter = node.node.frontmatter
          let img = frontmatter.img.childImageSharp.fluid
          return (
            <div style={style.post} key={node.node.parent.relativeDirectory}>
              <Link
                to={'/' + node.node.parent.relativeDirectory}
                style={style.link}
                title={frontmatter.linktitle}
              >
                <figure style={style.figure}>
                  <img
                    src={img.base64}
                    style={{ width: '100%' }}
                    srcSet={img.srcSet}
                    alt={frontmatter.caption}
                  />
                </figure>
                <h2 style={style.title}>{frontmatter.title}</h2>
                <p style={style.blurb}>{node.node.excerpt}</p>
              </Link>
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}

export default ShowcaseIndexTemplate
