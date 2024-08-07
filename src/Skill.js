import React, { useState, useRef } from 'react';  // Importera useRef
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const Skill = () => {
    const [skills, setSkills] = useState([]);
    const [sortType, setSortType] = useState('none');
    const { register, handleSubmit, reset } = useForm();
    const audioRef = useRef(null);  // Skapar referens till ljudfilen

    const onSubmit = (data) => {
        const newSkill = {
            id: uuidv4(),
            title: data.skillTitle
        };
        setSkills([...skills, newSkill]);
        reset();
        audioRef.current.play();  // Spela upp ljudet när en ny färdighet läggs till
    };

    const sortSkills = (skills, type) => {
        switch (type) {
            case 'title-asc':
                return [...skills].sort((a, b) => a.title.localeCompare(b.title));
            case 'title-desc':
                return [...skills].sort((a, b) => b.title.localeCompare(a.title));
            default:
                return skills;
        }
    };

    const sortedSkills = sortSkills(skills, sortType);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="skillTitle" className="form-label">Skill Title</label>
                    <input
                        type="text"
                        id="skillTitle"
                        className="form-control"
                        {...register('skillTitle', { required: true })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Skill</button>
            </form>

            <div className="mt-3">
                <label htmlFor="sortType" className="form-label">Sort By</label>
                <select
                    id="sortType"
                    className="form-select"
                    onChange={(e) => setSortType(e.target.value)}
                >
                    <option value="none">None</option>
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                </select>
            </div>

            <ShowData skills={sortedSkills} />

            {/* swoosh sound */}
            <audio ref={audioRef} src="Sounds/swoosh1.mp3" />  
        </div>
    );
};

const ShowData = ({ skills }) => {
    const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];

    return (
        <ul className="list-group mt-4">
            {skills.map((skill, index) => (
                <li
                    key={skill.id}
                    className="list-group-item"
                    style={{ backgroundColor: colors[index % colors.length] }}
                >
                    ★ {skill.title}
                </li>
            ))}
        </ul>
    );
};

export default Skill;
