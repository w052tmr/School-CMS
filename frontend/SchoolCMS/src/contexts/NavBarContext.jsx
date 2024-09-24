// import { createContext, useContext, useEffect, useState } from "react";

// const NavBarContext = createContext();

// function NavBarProvider({ children }) {
//     const [isActive, setIsActive] = useState(() => {
//         const storage = Boolean(sessionStorage.getItem("nav"));
//         return storage;
//     });

//     useEffect(
//         function () {
//             const val = isActive ? String(true) : "";
//             sessionStorage.setItem("nav", val);
//         },
//         [isActive]
//     );

//     const showNav = () => {
//         setIsActive(true);
//     };

//     const hideNav = () => {
//         setIsActive(false);
//     };

//     return (
//         <NavBarContext.Provider
//             value={{
//                 barIsActive: isActive,
//                 showNav: () => showNav(),
//                 hideNav: () => hideNav(),
//             }}
//         >
//             {children}
//         </NavBarContext.Provider>
//     );
// }

// function useNavBar() {
//     return useContext(NavBarContext);
// }

// export { NavBarProvider, useNavBar };
