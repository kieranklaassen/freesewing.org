import React, { useState, useCallback, useContext } from 'react'
import {useDropzone} from 'react-dropzone'
import { FormattedMessage } from "react-intl";
import AppContext from "../../context/app";
import Blockquote from "@freesewing/components/Blockquote";
import Button from "@material-ui/core/Button";

const AccountAvatar = props => {
  const [img, setImg] = useState(false);
  const app = useContext(AppContext);
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()
      reader.onload = () => {
        setImg(reader.result);
      }
      acceptedFiles.forEach(file => reader.readAsDataURL(file))
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    avatar: {
      width: "calc(50% - 1rem)",
      borderRadius: "6px",
    },
    dropzone: {
      width: "calc(50% - 3rem)",
      border: "6px dashed #aaa",
      textAlign: "center",
      padding: "2rem 1rem",
    },
  }

  if (app.frontend.mobile) {
    styles.avatar.width = "100%";
    styles.dropzone.width = "100%";
    styles.dropzone.marginTop = "2rem";
    styles.dropzone.height = "200px";
  }

  return (
    <React.Fragment>
      <Blockquote type="note">
        <FormattedMessage id="account.avatarInfo" />
      </Blockquote>
      <div style={styles.wrapper}>
        <img src={img || app.account.pictureUris.m} style={styles.avatar} className="shadow"/>
        <div {...getRootProps()} style={styles.dropzone}>
          <input {...getInputProps()} />
          <p><FormattedMessage id="app.dragAndDropImageHere" /></p>
          <p>
            <Button
              variant="outlined"
              color="primary"
            >
              <FormattedMessage id="app.selectImage" />
            </Button>
          </p>
        </div>
      </div>
      { img ? <p style={{textAlign: "right"}}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => app.backend.saveAccount(
            {avatar: img},
            app.frontend.intl.formatMessage({id: "account.avatar"})
          )}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p> : null }
    </React.Fragment>
  );
};

export default AccountAvatar;
