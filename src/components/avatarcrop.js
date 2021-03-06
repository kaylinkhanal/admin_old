import React, { Component } from "react";
import ReactDOM from "react-dom";
import Dropzone from "react-dropzone";
import ReactAvatarEditor from "./index";

import Preview from "./Preview.jsx";

class Avatarcrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      allowZoomOut: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 0,
      preview: null,
      width: 200,
      height: 200,
      sendingImag: "",
      previewImage: "",
      carousel1: "",
      nn: false
    };
    this.handleNewImage = this.handleNewImage.bind(this);
    this.handleScale = this.handleScale.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
  }

  componentDidMount() {
    console.log(this.state.nn);
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    this.setState({
      sendingImage: img
    });
  }
  componentWillReceiveProps(data) {
    this.setState({
      image: data.defaultImage,
      width: data.size[0],
      height: data.size[1],
      previewImage: data.previewImage
    });
  }

  handleNewImage = e => {
    this.setState({ image: e.target.files[0] });
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    this.setState({
      sendingImage: img
    });
    this.setState({
      nn: true
    });
  };

  handleSave = data => {
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    const rect = this.editor.getCroppingRect();

    this.setState({
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius
      }
    });
  };

  handleScale = e => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    this.setState({
      sendingImage: img
    });
  };

  handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
    this.setState({ allowZoomOut });
  };

  rotateLeft = e => {
    e.preventDefault();

    this.setState({
      rotate: this.state.rotate - 90
    });
  };

  rotateRight = e => {
    e.preventDefault();
    this.setState({
      rotate: this.state.rotate + 90
    });
  };

  handleBorderRadius = e => {
    const borderRadius = parseInt(e.target.value);
    this.setState({ borderRadius });
  };

  handleXPosition = e => {
    const x = parseFloat(e.target.value);
    this.setState({ position: { ...this.state.position, x } });
  };

  handleYPosition = e => {
    const y = parseFloat(e.target.value);
    this.setState({ position: { ...this.state.position, y } });
  };

  handleWidth = e => {
    const width = parseInt(e.target.value);
    this.setState({ width });
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    this.setState({
      sendingImage: img
    });
  };

  handleHeight = e => {
    const height = parseInt(e.target.value);
    this.setState({ height });
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    this.setState({
      sendingImage: img
    });
  };

  logCallback(e) {
    // eslint-disable-next-line
    var image = this.editor.getImageScaledToCanvas().toDataURL();
    this.setState({
      sendingImage: image
    });
  }

  setEditorRef = editor => {
    if (editor) this.editor = editor;
  };

  handlePositionChange = position => {
    this.setState({ position });
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    this.setState({
      sendingImage: img
    });
  };

  handleDrop = acceptedFiles => {
    this.setState({ image: acceptedFiles[0] });
  };

  render() {
    return (
      <div>
        {/* <Dropzone
          onDrop={this.handleDrop}
          disableClick
          multiple={false}
          style={{ width: this.state.width, height: this.state.height, marginBottom:'35px' }}
        > */}
        <div>
          <ReactAvatarEditor
            ref={this.setEditorRef}
            scale={parseFloat(this.state.scale)}
            width={this.state.width}
            height={this.state.height}
            position={this.state.position}
            onPositionChange={this.handlePositionChange}
            rotate={parseFloat(this.state.rotate)}
            borderRadius={this.state.width / (100 / this.state.borderRadius)}
            onLoadFailure={this.logCallback.bind(this, "onLoadFailed")}
            onLoadSuccess={this.logCallback.bind(this, "onLoadSuccess")}
            onImageReady={this.logCallback.bind(this, "onImageReady")}
            image={this.state.image}
            className="editor-canvas"
          />
        </div>
        {/* </Dropzone> */}
        <br />
        {this.state.previewImage == "" ||
        this.state.previewImage == undefined ||
        typeof this.state.image == "object"
          ? "New File:"
          : "Replace Image"}
        <input name="newImage" type="file" onChange={this.handleNewImage} />
        <br />
        {this.state.previewImage == "" ||
        this.state.previewImage == undefined ||
        typeof this.state.image == "object" ? (
          <div>
            Zoom:
            <input
              name="scale"
              type="range"
              onChange={this.handleScale}
              min={this.state.allowZoomOut ? "0.1" : "1"}
              max="2"
              step="0.01"
              defaultValue="1"
            />
          </div>
        ) : (
          ""
        )}

        <br />
        {/* {'Allow Scale < 1'}
        <input
          name="allowZoomOut"
          type="checkbox"
          onChange={this.handleAllowZoomOut}
          checked={this.state.allowZoomOut}
        />
        <br />
        Border radius:
        <input
          name="scale"
          type="range"
          onChange={this.handleBorderRadius}
          min="0"
          max="50"
          step="1"
          defaultValue="0"
        /> */}
        <br />
        {/* Avatar Width:
        <input
          name="width"
          type="number"
          onChange={this.handleWidth}
          min="50"
          max="400"
          step="10"
          value={this.state.width}
        />
        <br />
        Avatar Height:
        <input
          name="height"
          type="number"
          onChange={this.handleHeight}
          min="50"
          max="400"
          step="10"
          value={this.state.height}
        /> */}
        {/* <br />
        X Position:
        <input
          name="scale"
          type="range"
          onChange={this.handleXPosition}
          min="0"
          max="1"
          step="0.01"
          value={this.state.position.x}
        />
        <br />
        Y Position:
        <input
          name="scale"
          type="range"
          onChange={this.handleYPosition}
          min="0"
          max="1"
          step="0.01"
          value={this.state.position.y}
        />
        <br />
        Rotate:
        <button onClick={this.rotateLeft}>Left</button>
        <button onClick={this.rotateRight}>Right</button>
        <br />
        <br />
        <input type="button" onClick={this.handleSave} value="Preview" />
        <br />
        {!!this.state.preview && (
          <img
            src={this.state.preview.img}
            style={{
              borderRadius: `${(Math.min(
                this.state.preview.height,
                this.state.preview.width
              ) +
                10) *
                (this.state.preview.borderRadius / 2 / 100)}px`,
            }}
          />
        )} */}
        {/* {!!this.state.preview && (
          <Preview
            width={
              this.state.preview.scale < 1
                ? this.state.preview.width
                : this.state.preview.height * 478 / 270
            }
            height={this.state.preview.height}
            image="avatar.jpg"
            rect={this.state.preview.rect}
          />
        )} */}
        <input
          type="hidden"
          value={this.state.sendingImage}
          id={this.props.id}
        />
        <input type="hidden" value={this.state.image} id={"update"} />
        <input type="hidden" value={this.state.nn} className={this.props.id} />
      </div>
    );
  }
}

export default Avatarcrop;
