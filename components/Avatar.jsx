import Image from "next/image"
import DefaultUserImage from '../public/default-user.png'

const Avatar = ({profilePic, displayName, email}) => {

  return (
    <div className="avatar">
        <div className="image-container">
        {profilePic ? <Image src={profilePic} width={30} height={30} objectFit={'cover'} alt={'avatar'}/> :
        <Image src={DefaultUserImage} width={30} height={30} objectFit={'cover'} alt={'avatar'}/>}
        </div>
        <p>
            {displayName ? displayName : email}
        </p>
    </div>
  )
}

export default Avatar