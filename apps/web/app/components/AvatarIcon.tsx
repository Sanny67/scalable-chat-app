import React from 'react';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IconMap {
    [key: string]: solidIcons.IconDefinition;
}

const defaultIcon : solidIcons.IconDefinition = solidIcons.faFrog;

const icons: IconMap = {
    "Frog": solidIcons.faFrog,
    "Dragon": solidIcons.faDragon,
    "Otter": solidIcons.faOtter,
    "Fishy": solidIcons.faFishFins,
    "Hippo": solidIcons.faHippo,
    "Cat": solidIcons.faCat,
    "Bird": solidIcons.faDove,
    "Spider": solidIcons.faSpider,
    "Horse": solidIcons.faHorse,
    "Kiwi": solidIcons.faKiwiBird,
};
  
const getIcon = (avatarAnimal: string): solidIcons.IconDefinition => {
    const icon = icons[avatarAnimal];
    if (icon !== undefined) {
      return icon;
    } else {
      return defaultIcon; 
    }
};

interface AvatarIconProps {
    key: string;
};

const AvatarIcon = ({ key }: AvatarIconProps) => {
    return (
      <>
        <FontAwesomeIcon icon={getIcon(key || "") as solidIcons.IconDefinition} />
      </>
    );
};

export default AvatarIcon;
