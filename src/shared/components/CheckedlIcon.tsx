import {Path, Svg} from "react-native-svg";
import React from "react";
import {sharedColors} from "../styles/colors";

type IconTypeProps = {
    width?: string,
    height?: string,
    fill?: string,
    backgroundFill?: string,
}

export const CheckedIcon = (props: IconTypeProps) => {

    const {
        width = '48',
        height = '48',
        fill = sharedColors.white,
    } = props

    return (
        <Svg
            height={height}
            width={width}
            fill={fill}
            viewBox="0 -960 960 960"
        >
            <Path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/>
        </Svg>
    )
};