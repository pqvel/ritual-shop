import React, { useCallback, useEffect, useState, useRef, FC } from "react";
import classnames from "classnames";

type Props = {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
  className?: string;
};

const RangeSlider: FC<Props> = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number): number => {
      return Math.round(((value - min) / (max - min)) * 100);
    },
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange(minVal, maxVal);
  }, [minVal, maxVal, onChange]);

  return (
    <div className="relative w-full h-[calc(100%+5px)]">
      <div className=" grid grid-cols-2 gap-2 mb-4">
        <input
          className="border border-gray-200 bg-slate-50 rounded px-2 py-1"
          placeholder="от 0.00 руб"
          value={minVal}
        />
        <input
          className="border border-gray-200 bg-slate-50 rounded px-2 py-1"
          placeholder="от 0.00 руб"
          value={maxVal}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        step={1}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={classnames("thumb thumb--zindex-3", {
          "thumb--zindex-5": minVal > max - 100,
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        step={1}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb thumb--zindex-4"
      />

      <div className="relative w-full">
        <div className=" absolute slider__track" />
        <div ref={range} className=" absolute slider__range" />
      </div>
    </div>
  );
};

export default RangeSlider;
