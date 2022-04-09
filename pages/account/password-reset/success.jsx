import { withPublic } from "../../../hoc/route"

const SuccessPage = () => {
  return (
    <div>We have sent the link to reset your password to your mail, if you don&apos;t see it, please check your spam folder</div>
  )
}

export default withPublic(SuccessPage)