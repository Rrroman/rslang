import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { RootStateType } from '../../reducer/root-reducer';
import { saveUploadFoto64 } from '../../actions/user-actions';
import styles from './image-loader.module.css';

const ImageLoader: React.FC = () => {
  const user = useSelector((state: RootStateType) => state.userState.user);
  const isLogin = useSelector(
    (state: RootStateType) => state.userState.isLogin
  );

  const dispatch = useDispatch();

  const [images, setImages] = React.useState([]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    if (imageList[0].dataURL) {
      dispatch(saveUploadFoto64(imageList[0].dataURL.split(',')[1]));
    }
    setImages(imageList as never[]);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple={false}
        value={images}
        onChange={onChange}
        maxFileSize={1048576}
        acceptType={['jpg', 'gif', 'png']}
      >
        {({ imageList, onImageUpload, errors }) => (
          <div className="upload__image-wrapper">
            {user.foto64.length > 0 ? (
              <img
                src={`data:image/png;base64,${user.foto64}`}
                alt=""
                className={styles['profile-img']}
                width="100"
                onClick={onImageUpload}
                aria-hidden="true"
              />
            ) : (
              <AddPhotoAlternateIcon
                style={{ fontSize: 60 }}
                onClick={onImageUpload}
              />
            )}
            {errors && (
              <div>
                {errors.acceptType && (
                  <span>список разрещенных форматов: jpg, gif, png </span>
                )}
                {errors.maxFileSize && (
                  <span>Максимальный размер файла 1MB</span>
                )}
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export { ImageLoader };
