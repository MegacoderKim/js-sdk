import * as React from 'react';
import './ProfileImage.component.css';
const images = {
  defaultProfilePic: require('../../assets/default-profile-pic.png')
};

class ProfileImageComponent extends React.Component<ProfileImageComponentProps, {}> {
  constructor() {
    super();
  }

  render() {
    return this.createProfileImageContainer();
  }

  createProfileImageContainer() {
    let photo = this.props.source || images.defaultProfilePic;
    const divStyle = {
      backgroundImage: `url(${photo})`
    };
    return (
      <div className="profile-image-picture-container">
        <div className="profile-image-picture" id="pic" style={divStyle} />
      </div>
    );
  }
}

interface ProfileImageComponentProps {
  source: string | null;
}

export default ProfileImageComponent;
