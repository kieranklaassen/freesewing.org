import React, { useEffect } from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/react'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'

const BlogTemplate = props => {
  useEffect(() => {
    props.app.frontend.setTitle(props.pageContext.node.frontmatter.title)
  }, [])
  let frontmatter = props.pageContext.node.frontmatter
  let img = frontmatter.img.childImageSharp.fluid
  const style = {
    meta: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      fontFamily: "'Roboto Condensed', sans-serif"
    },
    title: {
      marginBottom: 0
    },
    figure: {
      marginTop: 0
    }
  }

  return (
    <React.Fragment>
      <div style={style.meta}>
        <FormattedDate value={frontmatter.date} year="numeric" month="long" day="2-digit" />
        <div>
          <FormattedMessage id="app.by" />
          &nbsp;
          <Link to={'/users/' + frontmatter.author}>{frontmatter.author}</Link>
        </div>
      </div>
      <figure style={style.figure}>
        <a href={img.originalImg}>
          <img
            src={img.base64}
            style={{ width: '100%' }}
            srcSet={img.srcSet}
            alt={frontmatter.caption}
          />
        </a>
        <figcaption>{frontmatter.caption}</figcaption>
      </figure>
      <MDXProvider components={props.components}>
        <MDXRenderer>{props.pageContext.node.code.body}</MDXRenderer>
      </MDXProvider>
    </React.Fragment>
  )
}

export default BlogTemplate
