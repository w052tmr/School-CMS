// handles state updates for teachers, students, courses, and assignments when form inputs change
export const handleSetState = (id, state, setState) => {
    // look for student / teacher
    const found = state.find((el) => el === id);
    if (found) {
        //if course exists, remove it
        setState((prev) => prev.filter((el) => el !== found));
    } else {
        // if course does not exist, add it
        setState((prev) => [...prev, id]);
    }
};
