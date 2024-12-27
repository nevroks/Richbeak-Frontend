import {ResponsivePie} from "@nivo/pie";
import cn from "classnames";
import classes from "../BarChart/style.module.css";
import {FC} from "react";


type PieChartPropsType = {
    // @ts-ignore
    data: readonly RawDatum[],
    height: number,
    width:number,
    className?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

const PieChart: FC<PieChartPropsType> = ({
                                             data,
                                             height,
                                             className,
                                             width,
                                             ...restProps
                                         }) => {
    return (
        <div style={{height: `${height}px`,width:`${width}px`}} className={cn(classes["PieChart__wrapper"], {
            // @ts-ignore
            [className]: Boolean(className)
        })}>
            <ResponsivePie
                data={data}
                {...restProps}
            />
        </div>
    );
};

export default PieChart;