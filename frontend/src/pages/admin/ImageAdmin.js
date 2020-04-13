/* eslint-disable camelcase */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import { Container, Content } from './styles';

import Upload from './Upload';
import FileList from './FileList';
import { deleteImage } from '../../services/apiCalls';
import api from '../../services/api';

class ImageAdmin extends Component {
  state = {
    uploadedFiles: [],
  };

  fetchFiles = (gallery, galleryName) => {
    if (!gallery) return;

    this.setState({
      uploadedFiles: gallery.map((file) => ({
        id: file._id,
        _id: file._id,
        galleryName,
        name: file.name,
        size: file.size,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url,
      })),
    });
  };

  handleUpload = (files) => {
    const mapFunction = (file) => ({
      file,
      id: uniqueId(),
      galleryName: this.props.galleryName,
      name: file.name.split(' ').join('_'),
      size: file.size,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    });

    const uploadedFiles = files.map(mapFunction);
    this.setState({
      uploadedFiles: [].concat(...this.state.uploadedFiles, ...uploadedFiles),
    });

    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data, callback = (context) => {}) => {
    this.setState(
      {
        uploadedFiles: this.state.uploadedFiles.map((uploadedFile) => (id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile)),
      },
      () => {
        callback(this);
      },
    );
  };

  processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);
    data.append('galleryName', this.props.galleryName);
    api
      .post('/private/images', data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        this.updateFile(
          uploadedFile.id,
          {
            uploaded: true,
            id: response.data._id,
            _id: response.data._id,
            url: response.data.url,
          },
          this.props.updateButton,
        );
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  handleDelete = async (id) => {
    try {
      await deleteImage(id);
    } catch (error) {
      return;
    }

    this.setState(
      {
        uploadedFiles: this.state.uploadedFiles.filter((file) => file.id !== id),
      },
      () => {
        this.props.updateButton(this);
      },
    );
  };

  componentWillUnmount() {
    this.state.uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }

  componentDidMount() {
    this.fetchFiles(this.props.gallery);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.fetchFiles(props.gallery, props.galleryName);
  }

  render() {
    const { uploadedFiles } = this.state;
    return (
      <Container>
        <Content>
          <Upload onUpload={this.handleUpload} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={this.handleDelete} />
          )}
        </Content>
      </Container>
    );
  }
}

export default ImageAdmin;
