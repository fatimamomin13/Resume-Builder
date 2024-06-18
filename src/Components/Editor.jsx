import React, { useState } from "react";
import InputControl from "./InputControl";
import { X } from "react-feather";
import { useEffect } from "react";
///Add a warning for workExp and Proj that they can add multiple things there and style to display better
///learn stopPropogation thing
/// active chip change
const Editor = (props) => {
    const sections = props.sections;
    const information = props.information;

    const sectionsArr = Object.keys(sections);

    const [activeSectionKey, setActiveSectionKey] = useState(sectionsArr[0]);

    const [activeDetailIndex, setActiveDetailIndex] = useState(0);

    const [activeInformation, setActiveInformation] = useState(
        information[sections[sectionsArr[0]]] // sectionsArr[0] -> basicInfo // Information[sections[basicInfo]] -> Id,sectionTitle, details
    );

    const [sectionTitle, setSectionTitle] = useState(sections[sectionsArr[0]]); // returns value and not key

    const [values, setValues] = useState({
        name: activeInformation?.detail?.name || "",
        title: activeInformation?.detail?.title || "",
        linkedin: activeInformation?.detail?.linkedin || "",
        github: activeInformation?.detail?.github || "",
        city: activeInformation?.detail?.city || "",
        phone: activeInformation?.detail?.phone || "",
        email: activeInformation?.detail?.email || "",
    });

    const handleClick = (key) => {
        setActiveSectionKey(key);
    };

    const handlePointUpdate = (value, index) => {
        const tempValues = { ...values };
        if (!Array.isArray(tempValues.points)) tempValues.points = [];
        tempValues.points[index] = value;
        setValues(tempValues);
    };

    const handleAddNew = () => {
        const details = activeInformation?.details;
        if (!details) return;
        const lastDetail = details.slice(-1)[0];
        if (!Object.keys(lastDetail).length) return;
        details?.push({});

        props.setInformation((prev) => ({
            ...prev,
            [sections[activeSectionKey]]: {
                ...information[sections[activeSectionKey]],
                details: details,
            },
        }));
        setActiveDetailIndex(details?.length - 1);
    };

    const handleDeleteDetail = (index) => {
        const details = activeInformation?.details
            ? [...activeInformation?.details]
            : "";
        if (!details) return;
        details.splice(index, 1);
        props.setInformation((prev) => ({
            ...prev,
            [sections[activeSectionKey]]: {
                ...information[sections[activeSectionKey]],
                details: details,
            },
        }));
        setActiveDetailIndex((prev) => (prev === index ? 0 : prev - 1));
    };

    const handleSubmission = () => {
        switch (sections[activeSectionKey]) {
            case sections.basicInfo: {
                const tempDetail = {
                    name: values.name,
                    title: values.title,
                    linkedin: values.linkedin,
                    github: values.github,
                    email: values.email,
                    phone: values.phone,
                };

                props.setInformation((prev) => ({
                    ...prev,
                    [sections.basicInfo]: {
                        ...prev[sections.basicInfo],
                        detail: tempDetail,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.workExp: {
                const tempDetail = {
                    certificationLink: values.certificationLink,
                    title: values.title,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    companyName: values.companyName,
                    location: values.location,
                    points: values.points,
                };
                const tempDetails = [...information[sections.workExp]?.details];
                tempDetails[activeDetailIndex] = tempDetail;

                props.setInformation((prev) => ({
                    ...prev,
                    [sections.workExp]: {
                        ...prev[sections.workExp],
                        details: tempDetails,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.project: {
                const tempDetail = {
                    link: values.link,
                    title: values.title,
                    overview: values.overview,
                    github: values.github,
                    points: values.points,
                };
                const tempDetails = [...information[sections.project]?.details];
                tempDetails[activeDetailIndex] = tempDetail;

                props.setInformation((prev) => ({
                    ...prev,
                    [sections.project]: {
                        ...prev[sections.project],
                        details: tempDetails,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.education: {
                const tempDetail = {
                    title: values.title,
                    college: values.college,
                    startDate: values.startDate,
                    endDate: values.endDate,
                };
                const tempDetails = [
                    ...information[sections.education]?.details,
                ];
                tempDetails[activeDetailIndex] = tempDetail;

                props.setInformation((prev) => ({
                    ...prev,
                    [sections.education]: {
                        ...prev[sections.education],
                        details: tempDetails,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.achievement: {
                const tempPoints = values.points;

                props.setInformation((prev) => ({
                    ...prev,
                    [sections.achievement]: {
                        ...prev[sections.achievement],
                        points: tempPoints,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.summary: {
                const tempDetail = values.summary;

                props.setInformation((prev) => ({
                    ...prev,
                    [sections.summary]: {
                        ...prev[sections.summary],
                        detail: tempDetail,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.skills: {
                const tempPoints = values.points;

                props.setInformation((prev) => ({
                    ...prev,
                    [sections.skills]: {
                        ...prev[sections.skills],
                        points: tempPoints,
                        sectionTitle,
                    },
                }));
                break;
            }
            default:
                console.log("Some Error Occured");
        }
    };

    useEffect(() => {
        const activeInfo = information[sections[activeSectionKey]];
        setSectionTitle(sections[activeSectionKey]);
        setValues({
            name: activeInfo?.detail?.name || "",
            overview: activeInfo?.details
                ? activeInfo.details[0]?.overview || ""
                : "",
            link: activeInfo?.details ? activeInfo.details[0]?.link || "" : "",
            certificationLink: activeInfo?.details
                ? activeInfo.details[0]?.certificationLink || ""
                : "",
            companyName: activeInfo?.details
                ? activeInfo.details[0]?.companyName || ""
                : "",
            college: activeInfo?.details
                ? activeInfo.details[0]?.college || ""
                : "",
            location: activeInfo?.details
                ? activeInfo.details[0]?.location || ""
                : "",
            startDate: activeInfo?.details
                ? activeInfo.details[0]?.startDate || ""
                : "",
            endDate: activeInfo?.details
                ? activeInfo.details[0]?.endDate || ""
                : "",
            points: activeInfo?.details
                ? activeInfo.details[0]?.points
                    ? [...activeInfo.details[0]?.points]
                    : ""
                : activeInfo?.points
                ? [...activeInfo.points]
                : "",
            title: activeInfo?.details
                ? activeInfo.details[0]?.title || ""
                : activeInfo?.detail?.title || "",
            linkedin: activeInfo?.detail?.linkedin || "",
            github: activeInfo?.details
                ? activeInfo.details[0]?.github || ""
                : activeInfo?.detail?.github || "",
            phone: activeInfo?.detail?.phone || "",
            email: activeInfo?.detail?.email || "",
            city: activeInfo?.detail?.city || "",
            summary:
                typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
            skills:
                typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
        });
    }, [activeSectionKey,sections,information]);

    useEffect(() => {
        setActiveInformation(information[sections[activeSectionKey]]);
    }, [activeSectionKey, sections, information]);

    useEffect(() => {
        const details = activeInformation?.details;
        if (!details) return;
        const activeInfo = information[sections[activeSectionKey]];

        setValues({
            overview: activeInfo.details[activeDetailIndex]?.overview || "",
            link: activeInfo.details[activeDetailIndex]?.link || "",
            certificationLink:
                activeInfo.details[activeDetailIndex]?.certificationLink || "",
            companyName:
                activeInfo.details[activeDetailIndex]?.companyName || "",
            location: activeInfo.details[activeDetailIndex]?.location || "",
            startDate: activeInfo.details[activeDetailIndex]?.startDate || "",
            endDate: activeInfo.details[activeDetailIndex]?.endDate || "",
            points: activeInfo.details[activeDetailIndex]?.points || "",
            title: activeInfo.details[activeDetailIndex]?.title || "",
            linkedin: activeInfo.details[activeDetailIndex]?.linkedin || "",
            github: activeInfo.details[activeDetailIndex]?.github || "",
            college: activeInfo.details[activeDetailIndex]?.college || "",
        });
    }, [activeDetailIndex, activeSectionKey, sections, information, activeInformation]);

    const basicInfoBody = (
        <div>
            <div section="form-row" className="flex flex-row gap-5 my-2">
                <InputControl
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={values.name}
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            name: event.target.value,
                        }))
                    }
                />
                <InputControl
                    label="Title"
                    value={values.title}
                    placeholder="Enter your title eg. Frontend developer"
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            title: event.target.value,
                        }))
                    }
                />
            </div>
            <div section="form-row" className="flex flex-row gap-5 my-2">
                <InputControl
                    label="LinkedIn LInk"
                    value={values.linkedin}
                    placeholder="Enter your title eg. Frontend developer"
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            linkedin: event.target.value,
                        }))
                    }
                />
                <InputControl
                    label="Github Link"
                    value={values.github}
                    placeholder="Enter your github profile link"
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            github: event.target.value,
                        }))
                    }
                />
                <InputControl
                    label="City"
                    value={values.city}
                    placeholder="Enter your address"
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            city: event.target.value,
                        }))
                    }
                />
            </div>
            <div section="form-row" className="flex flex-row gap-5 my-2">
                <InputControl
                    label="Email"
                    type="email"
                    value={values.email}
                    placeholder="Enter your email"
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            email: event.target.value,
                        }))
                    }
                />
                <InputControl
                    label="Phone"
                    value={values.phone}
                    placeholder="Enter your phone number"
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            phone: event.target.value,
                        }))
                    }
                />
            </div>
        </div>
    );

    const workExpBody = (
        <div>
            <div section="form-row" className="flex flex-row gap-5 my-2">
                <InputControl
                    label="Job Title"
                    placeholder="e.g Frontend Developer"
                    value={values.title}
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            title: event.target.value,
                        }))
                    }
                />
                <InputControl
                    label="Employer"
                    placeholder="e.g Infosys LTD"
                    value={values.companyName}
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            companyName: event.target.value,
                        }))
                    }
                />
            </div>
            <div section="form-row" className="flex flex-row gap-5 my-2">
                <InputControl
                    label="Start date"
                    type="date"
                    placeholder="MM/YY"
                    value={values.startDate}
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            startDate: event.target.value,
                        }))
                    }
                />
                <InputControl
                    label="End date"
                    type="date"
                    placeholder="MM/YY"
                    value={values.endDate}
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            endDate: event.target.value,
                        }))
                    }
                />
                <InputControl
                    label="Location"
                    placeholder="Mumbai"
                    value={values.location}
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            location: event.target.value,
                        }))
                    }
                />
            </div>
            <div section="form-row" className="flex flex-col gap-5 my-2">
                <label className="font-semibold text-base mt-3">
                    Enter work description
                </label>
                <InputControl
                    placeholder="Line 1"
                    value={values.points ? values.points[0] : ""}
                    onChange={(event) =>
                        handlePointUpdate(event.target.value, 0)
                    }
                />
                <InputControl
                    placeholder="Line 2"
                    value={values.points ? values.points[1] : ""}
                    onChange={(event) =>
                        handlePointUpdate(event.target.value, 1)
                    }
                />
                <InputControl
                    placeholder="Line 3"
                    value={values.points ? values.points[2] : ""}
                    onChange={(event) =>
                        handlePointUpdate(event.target.value, 2)
                    }
                />
            </div>
        </div>
    );

    const projectBody = (
        <div>
            <div section="form-row" className="flex flex-row gap-5 my-2 ">
                <InputControl
                    label="Project Title"
                    value={values.title}
                    placeholder="Enter title eg. Chat app"
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            title: event.target.value,
                        }))
                    }
                />
            </div>
            <div section="form-row" className="flex flex-row gap-5 my-2">
                <InputControl
                    label="Overview"
                    value={values.overview}
                    placeholder="Enter basic overview of project"
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            overview: event.target.value,
                        }))
                    }
                />
            </div>
            <div section="form-row" className="flex flex-row gap-5 my-2">
                <InputControl
                    label="Deployed Link"
                    value={values.link}
                    placeholder="Enter deployed link of project"
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            link: event.target.value,
                        }))
                    }
                />
                <InputControl
                    label="Github Link"
                    value={values.github}
                    placeholder="Enter github link of project"
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            github: event.target.value,
                        }))
                    }
                />
            </div>
            <div section="form-row" className="flex flex-col gap-5 my-2">
                <label>Enter project description</label>
                <InputControl
                    placeholder="Line 1"
                    value={values.points ? values.points[0] : ""}
                    onChange={(event) =>
                        handlePointUpdate(event.target.value, 0)
                    }
                />
                <InputControl
                    placeholder="Line 2"
                    value={values.points ? values.points[1] : ""}
                    onChange={(event) =>
                        handlePointUpdate(event.target.value, 1)
                    }
                />
                <InputControl
                    placeholder="Line 3"
                    value={values.points ? values.points[2] : ""}
                    onChange={(event) =>
                        handlePointUpdate(event.target.value, 2)
                    }
                />
                <InputControl
                    placeholder="Line 4"
                    value={values.points ? values.points[3] : ""}
                    onChange={(event) =>
                        handlePointUpdate(event.target.value, 3)
                    }
                />
            </div>
        </div>
    );

    const eduBody = (
        <div>
            <div section="form-row" className="flex flex-row gap-5 my-2">
                <InputControl
                    label="Title"
                    value={values.title}
                    placeholder="Enter title eg. B-tech"
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            title: event.target.value,
                        }))
                    }
                />
                <InputControl
                    label="College/School Name"
                    value={values.college}
                    placeholder="Enter name of your college/school"
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            college: event.target.value,
                        }))
                    }
                />
            </div>
            <div section="form-row" className="flex flex-row gap-5 my-2">
                <InputControl
                    label="Start Date"
                    type="date"
                    placeholder="Enter start date of this education"
                    value={values.startDate}
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            startDate: event.target.value,
                        }))
                    }
                />
                <InputControl
                    label="End Date"
                    type="date"
                    placeholder="Enter end date of this education"
                    value={values.endDate}
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            endDate: event.target.value,
                        }))
                    }
                />
            </div>
        </div>
    );

    const achivementsBody = (
        <div section="form-row" className="flex flex-col gap-5 my-2">
            <label>List your achievements</label>
            <InputControl
                placeholder="Line 1"
                value={values.points ? values.points[0] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 0)}
            />
            <InputControl
                placeholder="Line 2"
                value={values.points ? values.points[1] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 1)}
            />
            <InputControl
                placeholder="Line 3"
                value={values.points ? values.points[2] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 2)}
            />
            <InputControl
                placeholder="Line 4"
                value={values.points ? values.points[3] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 3)}
            />
        </div>
    );

    const summaryBody = (
        <div>
            <div>
                <InputControl
                    label="Summary"
                    value={values.summary}
                    placeholder="Enter your objective/summary"
                    onChange={(event) =>
                        setValues((prev) => ({
                            ...prev,
                            summary: event.target.value,
                        }))
                    }
                />
            </div>
        </div>
    );

    const skillsBody = (
        <div section="form-row" className="flex flex-col gap-5 my-2">
            <label>List your skills</label>
            <InputControl
                placeholder="Line 1"
                value={values.points ? values.points[0] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 0)}
            />
            <InputControl
                placeholder="Line 2"
                value={values.points ? values.points[1] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 1)}
            />
            <InputControl
                placeholder="Line 3"
                value={values.points ? values.points[2] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 2)}
            />
            <InputControl
                placeholder="Line 4"
                value={values.points ? values.points[3] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 3)}
            />
        </div>
    );

    const generateBody = () => {
        switch (sections[activeSectionKey]) {
            case sections.basicInfo:
                return basicInfoBody;
            case sections.workExp:
                return workExpBody;
            case sections.project:
                return projectBody;
            case sections.education:
                return eduBody;
            case sections.summary:
                return summaryBody;
            case sections.skills:
                return skillsBody;
            case sections.achievement:
                return achivementsBody;
            default:
                return null;
        }
    };

    // //basicInfo: "Basic Info",
    //   workExp: "Work Experience",
    //   project: "Projects",
    //   education: "Education",
    //   achievement: "Achievements",
    //   summary: "Summary",
    //   other: "Other",

    return (
        <>
            <div
                section="container"
                className="flex flex-col gap-x-10 mb-4 border border-solid border-1 border-gray-300 "
            >
                <div
                    section="header"
                    className="flex justify-around self-center w-full my-8 border-b border-solid border-gray-300"
                >
                    {sectionsArr.map((key) => (
                        <div
                            section="section"
                            className={`cursor-pointer inline text-xl ${
                                activeSectionKey === key
                                    ? "text-main-color border-b-4 border-solid pb-2 border-main-color active"
                                    : ""
                            } `}
                            key={key}
                            onClick={() => handleClick(key)} //wrapping the handleClick(key) in an arrow function (() => handleClick(key)), you ensure that the function is only called when the div is clicked
                        >
                            {sections[key]}
                        </div>
                    ))}
                </div>
                <div
                    section="body"
                    className="mx-12 border border-1 border-gray"
                >
                    <InputControl
                        label="Title"
                        placeholder="Enter section title"
                        value={sectionTitle}
                        onChange={(event) =>
                            setSectionTitle(event.target.value)
                        }
                    />
                    <div
                        section="chips-col"
                        className="flex gap-4 my-3 flex items-center h-full"
                    >
                        {activeInformation?.details // '?.' This is useful for situations where activeInformation might be null or undefined, preventing potential "TypeError: Cannot read property 'details' of null" errors.
                            ? activeInformation?.details?.map((item, index) => (
                                  <div
                                      section="chip"
                                      className="flex flex-row bg-gray-400 px-2 py-1.5 rounded-3xl gap-2 "
                                      key={item.title + index}
                                      onClick={() =>
                                          setActiveDetailIndex(index)
                                      }
                                  >
                                      <p>
                                          {sections[activeSectionKey]}{" "}
                                          {index + 1}
                                      </p>
                                      <X
                                          onClick={(event) => {
                                              event.stopPropagation();
                                              handleDeleteDetail(index);
                                          }}
                                      />
                                  </div>
                              ))
                            : ""}{" "}
                        {activeInformation?.details &&
                        activeInformation?.details?.length > 0 ? (
                            <div
                                className="text-main-color font-bold tracking-wide cursor-pointer"
                                onClick={handleAddNew}
                            >
                                +New
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    {generateBody()}
                </div>

                <button
                    className="w-32 self-center m-5 bg-main-color text-white hover:bg-main-hover p-2 rounded"
                    onClick={handleSubmission}
                >
                    Save
                </button>
            </div>
        </>
    );
};

export default Editor;
