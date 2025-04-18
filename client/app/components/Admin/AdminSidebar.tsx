'use client';
import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import QuizIcon from "@mui/icons-material/Quiz";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import avatarDefault from "../../../public/assets/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface ItemProps {
    title: string;
    icon: any;
    selected: string;
    setSelected: (title: string) => void;
    to: string;
}

const Item: FC<ItemProps> = ({ title, icon, selected, setSelected, to }) => (
    <MenuItem
        active={selected === title}
        onClick={() => setSelected(title)}
        icon={icon}
        style={{ color: selected === title ? "#867f78" : undefined }}
    >
      
 <Typography className="text-[16px] font-Poppins">{title}</Typography>
        
        <Link href={to} />
    </MenuItem>
);

const AdminSidebar = () => {
    const user = useSelector((state: any) => state.auth.user);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: theme === "dark" ? "#111C43 !important" : "#fff !important",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868c7e !important",
                },
                "& .pro-menu-item.active": {
                    color: "#867f78 !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-menu-item": {
                    color: theme === "dark" ? "#fff" : "#000",
                },
            }}
            className="bg-white dark:bg-slate-900"
        >
            <ProSidebar
                collapsed={isCollapsed}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    width: isCollapsed ? "70px" : "250px",
                }}
            >
                <Menu iconShape="square">
                    {/* Header and Collapse */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
                        style={{ margin: "10px 0 20px 0" }}
                    >
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Link href="/">
                                    <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">ELearning</h3>
                                </Link>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className="inline-block">
                                    <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1]" />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* Profile */}
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Image
                                    alt="profile-user"
                                    width={100}
                                    height={100}
                                    src={user?.avatar?.url ? user.avatar.url : avatarDefault}
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        border: "3px solid #d5b6f6",
                                    }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h4" className="text-sm text-black dark:text-[#ffffffc1]" sx={{ m: "10px 0 0 0" }}>
                                    {user?.name}
                                </Typography>
                                <Typography variant="h6" className="text-sm  text-black dark:text-[#ffffffc1] capitalize" sx={{ m: "10px 0 0 0" }}>
                                    - {user?.role}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* Menu Items */}
                    <Box mt="15px">
                        <Item title="Dashboard" to="/dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

                       {!isCollapsed &&( <Typography className="uppercase text-xs mt-6 mb-2 px-3 text-gray-500 dark:text-gray-400">Data</Typography>)}
                        <Item title="Users" to="/users" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Invoices" to="/invoices" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />

                        {!isCollapsed &&( <Typography className="uppercase text-xs mt-6 mb-2 px-3 text-gray-500 dark:text-gray-400">Content</Typography>)}
                        <Item title="Create Course" to="/admin/create-course" icon={<WysiwygIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Live Courses" to="/live-courses" icon={<VideoCallIcon />} selected={selected} setSelected={setSelected} />

                        {!isCollapsed &&(  <Typography className="uppercase text-xs mt-6 mb-2 px-3 text-gray-500 dark:text-gray-400">Analytics</Typography>)}
                        <Item title="Course Analytics" to="/courses-analytics" icon={<AssessmentIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="User Analytics" to="/user-analytics" icon={<GroupIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Order Analytics" to="/order-analytics" icon={<ShoppingCartIcon />} selected={selected} setSelected={setSelected} />

                        {!isCollapsed &&( <Typography className="uppercase text-xs mt-6 mb-2 px-3 text-gray-500 dark:text-gray-400">Customization</Typography>)}
                        <Item title="Hero" to="/hero" icon={<SettingsIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="FAQ" to="/faq" icon={<QuizIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Categories" to="/categories" icon={<MapOutlinedIcon />} selected={selected} setSelected={setSelected} />

                        {!isCollapsed &&( <Typography className="uppercase text-xs mt-6 mb-2 px-3 text-gray-500 dark:text-gray-400">Extra</Typography>)}
                        <Item title="Settings" to="/settings" icon={<SettingsIcon />} selected={selected} setSelected={setSelected} />

                        {!isCollapsed && (
                            <MenuItem
                                icon={<ExitToAppIcon />}
                                onClick={() => {
                                    // Implement logout logic
                                }}
                                style={{ marginTop: "auto", color: theme === "dark" ? "#fff" : "#000" }}
                            >
                                <Typography className="text-[16px] font-Poppins">Logout</Typography>
                            </MenuItem>
                        )}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default AdminSidebar;
