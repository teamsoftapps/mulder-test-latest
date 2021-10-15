import React, { useEffect, useState } from "react";
import classes from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { Button, IconButton, Drawer, List, ListItem } from "@material-ui/core";
import { Menu, Search } from "@material-ui/icons";
import { useSelector, shallowEqual } from "react-redux";

const postSelector = (state) => state.music;

function Header() {
    const { user } = useSelector(postSelector, shallowEqual);
    const [open, setOpen] = useState(false);
    const [sideBar, setShowSidebar] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 992) {
            setShowSidebar(true);
        }
        window.addEventListener("resize", () => {
            setOpen(false);
            if (window.innerWidth < 992) {
                setShowSidebar(true);
            }
            if (window.innerWidth > 991) {
                setShowSidebar(false);
            }
        });
        return () => {
            window.removeEventListener("resize", () => {});
        };
    }, []);

    function handleLogout() {
        localStorage.removeItem("music-app-credentials");
        window.location.href = "/";
    }
    function handleToggle() {
        setOpen((preSrate) => !preSrate);
    }

    const drawer = (
        <Drawer open={open} onClose={handleToggle}>
            <List component="nav" aria-labelledby="nested-list-subheader" className={classes.drawerList}>
                <div style={{ cursor: "pointer" }} className={classes.headerMainImage} onClick={handleToggle}>
                    <Image src="/images/logo.svg" alt="" width={250} height={50} layout="responsive" />
                </div>
                <ul>
                    {nav.map(({ route, title }, i) =>
                        user && title === "LOGIN" ? null : (
                            <ListItem key={i} button component="li" className={classes.drawerListItem}>
                                <Link href={route}>{title}</Link>
                            </ListItem>
                        ),
                    )}
                </ul>
            </List>
        </Drawer>
    );

    return (
        <header className={`${classes.header} ${classes.headerActive}`}>
            <div className={classes.headerTop}>
                {sideBar && (
                    <div className={classes.headerLogo}>
                        <IconButton onClick={handleToggle}>
                            <Menu />
                        </IconButton>
                        <Link href="/">
                            <a>
                                <Image src="/images/logo.svg" alt="" width={150} height={40} layout="fixed" />
                            </a>
                        </Link>
                    </div>
                )}

                <div className={classes.search}>
                    <IconButton>
                        <Search />
                    </IconButton>
                    <input type="text" placeholder="Search for the songs, albums etc.." />
                </div>
                {!sideBar && (
                    <div className={classes.headerActions}>
                        <IconButton>
                            <Image src="/images/gear-white.png" alt="" width={25} height={25} />
                        </IconButton>
                        {user && (
                            <IconButton>
                                <Image src="/images/logout-white.png" alt="" width={25} height={25} onClick={handleLogout} />
                            </IconButton>
                        )}
                    </div>
                )}
            </div>
            {!sideBar && (
                <div className={classes.headerMain}>
                    <div className={classes.headerMainImage}>
                        <Image src="/images/logo.svg" alt="" width={750} height={250} layout="intrinsic" />
                    </div>
                    <nav className={classes.headerNavigation}>
                        <ul>
                            {nav.map(({ route, title }, i) =>
                                user && title === "LOGIN" ? null : (
                                    <li key={i}>
                                        <Link href={route}>{title}</Link>
                                    </li>
                                ),
                            )}
                        </ul>
                    </nav>
                </div>
            )}
            {drawer}
        </header>
    );
}

export default Header;

const nav = [
    {
        title: "HOME",
        route: "/",
    },
    {
        title: "CD STORE",
        route: "/",
    },
    {
        title: "SHEET MUSIC",
        route: "/",
    },
    {
        title: "BIOGRAPHY",
        route: "/",
    },
    {
        title: "NEW & EVENTS",
        route: "/",
    },
    {
        title: "GUESTBOOK",
        route: "/",
    },
    {
        title: "LOGIN",
        route: "/auth",
    },
];
