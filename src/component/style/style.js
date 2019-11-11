export const styles = {
  sidebar: {
    display: "block",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    padding: "48px 0 0",
    boxShadow: `inset -1px 0 0 rgba(0, 0, 0, .1)`,
    "@media (max-width: 768px)": {
      display: "none"
    }
  },
  main: {
    position: "relative",
    marginLeft: "auto",
    padding: "50px 0 0 0",
    width:'100%',
  },
  navbar: {
    paddingBottom: "0px",
    paddingTop: "0px",
    backgroundColor: "#114769",
    boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)"
  }
};
