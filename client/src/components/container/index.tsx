import { Container as CustomContainer, ThemeProvider } from "@mui/material"
import theme from "../../../theme"

interface IContainer {
    children: React.ReactNode,
}

export const Container: React.FC<IContainer> = ({ children }) =>
// TODO: Provide the ThemeProvider somewhere in the root component
    <ThemeProvider theme={theme}>
        <CustomContainer component="main" maxWidth="xs">
            {children}
        </CustomContainer>
    </ThemeProvider>





