"use client";
import { FC } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";

const ContactsMap: FC = () => {
  return (
    <YMaps query={{ apikey: "3766c646-1084-4ed5-af0d-a710770568b7" }}>
      <Map
        className=" absolute top-0 left-0 w-full h-full rounded overflow-hidden"
        defaultState={{ center: [54.812343, 26.161555], zoom: 13 }}
        width={"100%"}
        height={"100%"}
      />
    </YMaps>
  );
};

export default ContactsMap;
