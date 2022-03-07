import PropTypes from "prop-types"
import React from "react"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Hidden from "@material-ui/core/Hidden"
import Drawer from "@material-ui/core/Drawer"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"

interface Props {
  companyName: string
}

const useStyles = makeStyles(theme => ({
  appBar: {
    color: "#233348",
    backgroundColor: "#FFF",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    fontWeight: 800,
  },
  drawerTitle: {
    padding: 20,
    color: "#000",
    fontWeight: 800,
  },
  drawerList: {
    width: "100%",
    color: "#000",
  },
  drawerToggle: {
    padding: 20,
  },
}))

const Header = ({ companyName }: Props) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const navLinks = [
    { displayText: "MAPA", link: "#" },
    { displayText: "O KNJIZI", link: "#oknjizi" },
    { displayText: "LINKKOVI", link: "#linkovi" },
  ]

  return (
    <React.Fragment>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Hidden smUp>
            <IconButton
              className={classes.drawerToggle}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.toolbarTitle}
          >
            VEK MODERNE ARHITEKTURE
          </Typography>

          <Hidden xsDown>
            {navLinks.map(item => (
              <Button href={item.link} color="inherit" key={item.displayText}>
                {item.displayText}
              </Button>
            ))}
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onEscapeKeyDown={handleDrawerClose}
        onBackdropClick={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <Typography
          variant="h6"
          color="inherit"
          className={classes.drawerTitle}
        >
          VEK MODERNE ARHITEKTURE
        </Typography>
        <List className={classes.drawerList}>
          {navLinks.map((item, index) => (
            <ListItem
              href={item.link}
              component="a"
              button
              key={item.displayText}
              onClick={handleDrawerClose}
            >
              <ListItemText primary={item.displayText} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  )
}

Header.propTypes = {
  companyName: PropTypes.string,
}

Header.defaultProps = {
  companyName: `vHealth`,
}

export default Header
