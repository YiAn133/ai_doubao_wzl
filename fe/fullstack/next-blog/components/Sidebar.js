import React  from "react";
import Link from "next/link";
import { getAllNotes } from "@/lib/redis";
import SiderbarNoteList from './SidebarNoteList';

export default async function Sidebar(params) {
    const notes = await getAllNotes();
    console.log(notes);
    
    return (
        <>
        {/* 区块 ：语义是独立的一块区域 */}
        <section className="col sidebar">
            <Link href={"/"} className="sidebar-header">
                <img className="logo" src="/logo.svg" width="22px" height="20px" role="presentation"/>
                <strong>LLM Notes</strong>
            </Link>
            <section className="sidebar-menu" role="menubar">
                {/* SideSearchField 未来干 */}
               
            </section>
            <nav>
                {/* SiderbarNoteList */}
                <SiderbarNoteList notes={notes}/>
            </nav>
        </section>
        </>
    )
}