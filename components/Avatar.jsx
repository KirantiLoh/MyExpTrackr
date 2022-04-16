import Image from "next/image"
import DefaultUserImage from '../public/default-user.png'

const Avatar = ({profilePic, displayName, email, imageWidth, imageHeight}) => {

  return (
    <div className="avatar">
        <div className="image-container">
        {profilePic ? <Image src={profilePic} width={imageWidth} height={imageHeight} objectFit={'cover'} alt={'avatar'}/> :
        <Image src={DefaultUserImage} width={imageWidth} height={imageHeight} objectFit={'cover'} alt={'avatar'}/>}
        </div>
        <h1 style={{margin: '0 20px'}}>
            {displayName ? displayName : email}
        </h1>
    </div>
  )
}

export default Avatar