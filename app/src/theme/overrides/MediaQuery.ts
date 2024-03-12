// import { Components, Theme } from "@mui/material/styles";

// // ** third party
// import mediaQuery from "css-mediaquery";

// export default function MediaQuery(
//   theme: Theme
// ): Components<Omit<Theme, "components">> {
//   const ssrMatchMedia = (query: string) => ({
//     matches: mediaQuery.match(query, {
//       // The estimated CSS width of the browser.
//       width: deviceType === "mobile" ? "0px" : "1024px",
//     }),
//   });

//   return {
//     MuiUseMediaQuery: {
//       defaultProps: {
//         ssrMatchMedia,
//       },
//     },
//   };
// }
