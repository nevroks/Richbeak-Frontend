import {FC, ReactNode} from "react";
import {BarTooltipProps, ResponsiveBar} from "@nivo/bar";
import {Theme} from "@nivo/core";
import classes from "./style.module.css";
import {CustomBarChartLine} from "./CustomBarChartLine.tsx";
import cn from "classnames";


type BarChartPropsType = {
    // @ts-ignore
    data: readonly RawDatum[],
    height: number,
    className?: string,
    theme?: Theme,
    colors?: string[],
    colorBy?: "id" | "indexValue",
    keys?: string[],
    indexBy?: string,
    axisBottom?: object,
    axisLeft?: object,
    borderRadius?: number,
    margin?: object,
    padding?: number,
    // @ts-ignore
    tooltip?: (e: BarTooltipProps<RawDatum>)=>ReactNode,
    hoverColor?:string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

const BarChart: FC<BarChartPropsType> = ({
                                             data,
                                             height,
                                             theme,
                                             colors,
                                             colorBy,
                                             keys,
                                             indexBy,
                                             axisBottom,
                                             axisLeft,
                                             borderRadius,
                                             margin,
                                             padding,
                                             tooltip,
                                             className,
                                             hoverColor,
                                             ...restProps
                                         }) => {


    return (
        <div style={{height: `${height}px`}} className={cn(classes["BarChart__wrapper"], {
            // @ts-ignore
            [className]: Boolean(className)
        })}>
            <ResponsiveBar
                data={data}
                theme={theme}
                barComponent={(props)=>CustomBarChartLine({...props,hoverColor:hoverColor})}
                colors={colors}
                colorBy={colorBy}
                keys={keys}
                indexBy={indexBy}
                axisBottom={axisBottom}
                axisLeft={axisLeft}
                borderRadius={borderRadius}
                margin={margin}
                padding={padding}
                tooltip={tooltip}
                {...restProps}
                enableLabel={false}
            />
        </div>
    );
};

export default BarChart;