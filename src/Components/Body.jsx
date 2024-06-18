import React, { useState, useRef } from "react";
import ReactToPrint from "react-to-print";

import { useEffect } from "react";
import { Download } from "react-feather";
import Editor from "./Editor";
import Resume from "./Resume";
const Body = () => {
    const colors = ["#A1EF8B", "#E5446D", "#F9C22E", "#92D5E6", "#A495DB"];
    const sections = {
        basicInfo: "Basic Info",
        workExp: "Work Experience",
        project: "Projects",
        education: "Education",
        achievement: "Achievements",
        summary: "Summary",
        skills: "Skills",
    };

    const resumeRef = useRef();
    const [activeColor, setActiveColor] = useState(colors[0]);

    const [resumeInformation, setResumeInformation] = useState({
        [sections.basicInfo]: {
            id: sections.basicInfo,
            sectionTitle: sections.basicInfo,
            detail: {},
        },
        [sections.workExp]: {
            id: sections.workExp,
            sectionTitle: sections.workExp,
            details: [],
        },
        [sections.project]: {
            id: sections.project,
            sectionTitle: sections.project,
            details: [],
        },
        [sections.education]: {
            id: sections.education,
            sectionTitle: sections.education,
            details: [],
        },
        [sections.achievement]: {
            id: sections.achievement,
            sectionTitle: sections.achievement,
            points: [],
        },
        [sections.summary]: {
            id: sections.summary,
            sectionTitle: sections.summary,
            detail: "",
        },
        [sections.skills]: {
            id: sections.skills,
            sectionTitle: sections.skills,
            points: [],
        },
    });

    useEffect(() => {
        console.log(resumeInformation);
    }, [resumeInformation]);

    return (
        <>
            <div section="toolbar" className="flex justify-around m-6">
                <div
                    section="colors"
                    className="flex gap-x-0 lg:gap-x-4 bg-blue"
                >
                    {colors.map((color) => (
                        <span
                            className="block p-3 h-18 w-18 rounded-full bg-black m-2"
                            key={color}
                            style={{ backgroundColor: color }}
                            onClick={() => setActiveColor(color)}
                        ></span>
                    ))}
                </div>
                <div>
                    <ReactToPrint
                        trigger={() => {
                            return (
                                <button className=" w-32 bg-main-color text-white hover:bg-main-hover p-2 rounded">
                                    Download{" "}
                                    <span>
                                        <Download className="inline h-4" />{" "}
                                    </span>
                                </button>
                            );
                        }}
                        content={() => resumeRef.current}
                    />
                </div>
            </div>
            <div section="editor" className="mx-72">
                <Editor
                    sections={sections}
                    information={resumeInformation}
                    setInformation={setResumeInformation}
                />
            </div>
            <div section="resume" className="mx-72">
                <Resume
                    ref={resumeRef}
                    sections={sections}
                    information={resumeInformation}
                    activeColor={activeColor}
                />
            </div>
        </>
    );
};

export default Body;
