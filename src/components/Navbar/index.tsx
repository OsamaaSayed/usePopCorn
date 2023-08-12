type NavbarProps = {
  children: React.ReactNode;
};

const Navbar = ({ children }: NavbarProps) => {
  return <nav className="nav-bar">{children}</nav>;
};

export default Navbar;
