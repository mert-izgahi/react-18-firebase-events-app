import {
    extendTheme,
    type ThemeConfig,
    withDefaultColorScheme,
} from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
    cssVarPrefix: "chakra",
};

const theme = extendTheme(withDefaultColorScheme({ colorScheme: "primary" }), {
    config,
    colors: {
        primary: {
            50: "#B8CDFF",
            100: "#A3BFFF",
            200: "#7AA2FF",
            300: "#5286FF",
            400: "#2969FF",
            500: "#004DFF",
            600: "#003CC7",
            700: "#002B8F",
            800: "#001A57",
            900: "#00091F",
            950: "#000103",
        },
    },

    components: {
        Input: {
            baseStyle: {
                field: {
                    _focus: {
                        borderColor: "primary.500",
                    },
                },
            },
        },
    },
});

export default theme;
