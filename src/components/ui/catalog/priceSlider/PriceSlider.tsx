import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  FC,
  ChangeEvent,
} from "react";
import "./styles.scss";
import { NumberInput, TextInput } from "../../formItems/Input";
import { useDeferredValue } from "react";
type Props = {
  min: number;
  max: number;
  onChange: (params: { min: number; max: number }) => void;
};

const getMinPrice = (value: number, min: number): number => {
  return value < min ? min : value;
};

const getMaxPrice = (value: number, max: number): number => {
  return value > max ? max : value;
};

const PriceSlider: FC<Props> = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<number>(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getMinPrice(minVal, min);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(getMaxPrice(maxVal, max));

    if (range.current) {
      range!.current!.style!.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  const handleChangeMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
    minValRef.current = value;
  };

  const handleChangeMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
    maxValRef.current = value;
  };

  const handleBlur = () => {
    setMinVal(getMinPrice(minVal, min));
    setMaxVal(getMaxPrice(maxVal, max));
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <NumberInput
          value={minVal}
          onChange={handleChangeMinPrice}
          onBlur={handleBlur}
        />
        <NumberInput
          value={maxVal}
          onChange={handleChangeMaxPrice}
          onBlur={handleBlur}
        />
      </div>
      <div className="flex flex-col">
        <input
          type="range"
          min={min}
          max={max}
          value={getMinPrice(minVal, min)}
          onChange={handleChangeMinPrice}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 ? "5" : undefined }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={getMaxPrice(maxVal, max)}
          onChange={handleChangeMaxPrice}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
