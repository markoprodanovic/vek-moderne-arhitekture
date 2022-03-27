import React from "react"
import Header from "../components/header"
import { Typography } from "@material-ui/core"

interface Props {
  title: any
  description?: any
  id?: any
  children?: any
}

const ItemWrapper = ({ title, description, id, children }: Props) => (
  <div style={{ margin: "0 auto", maxWidth: "960px" }}>
    <Typography
      id={id}
      variant="h6"
      style={{ fontWeight: 800, marginTop: "2rem" }}
    >
      {title}
    </Typography>
    <Typography>{description}</Typography>
    {children}
  </div>
)

const Oknjizi = () => {
  return (
    <React.Fragment>
      <Header />
      <ItemWrapper
        title="O KNJIZI"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
    </React.Fragment>
  )
}
export default Oknjizi
