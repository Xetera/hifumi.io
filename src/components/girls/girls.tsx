import * as React from "react";

import { WithChildren } from "../../types";
import {
  Card,
  CardContent, CardHeader, CardHeaderTitle,
  Column,
  Columns,
  Content,
  Level, LevelItem,
  LevelLeft,
  Section
} from "bloomer";

export const girls = [
  "hifumi",
  "aoba",
  "ko",
  "yun",
  "hajime",
  "nene",
  "nene",
  "rin",
  "umiko",
  "momo",
  "naru",
  "blue-haired-shop-keeper"
];

interface GirlTitleProps {
  name: string;
  thumbnail?: string;
  quote: string;
}

interface GirlProps {
  color: string;
  thumbnail: string;
  image: string;
  name: string;
  quote: string;
  weaknesses: string[];
  strengths: string[];
}

interface GirlList {
  name: string;
  items: string[];
}

interface GirlAssets {
  readonly [k: string]: {
    base: string;
    thumbnail: string;
  };
}

const girlAssets: GirlAssets = girls.reduce((all, girl) => {
  const name = girl.toLowerCase();
  let thumbnail;
  try {
    thumbnail = require(`./assets/${name}-thumbnail.png`);
  } catch (e) {/* optional */
  }
  try {
    return ({
      ...all,
      [name]: {
        base: require(`./assets/${name}.png`),
        thumbnail
      }
    });
  } catch (e) {
    return all;
  }
}, {});

const GirlList = ({ name, items }: GirlList) => (
  <div className="card is-size-6-mobile is-size-6-tablet is-size-5-desktop">
    <CardHeader className="is-size-6-mobile">
      <CardHeaderTitle>{name}</CardHeaderTitle>
    </CardHeader>
    <CardContent>
      <ul>
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>
    </CardContent>
  </div>
);

const GirlImage = ({ image }: { image: string }) => (
  <LevelItem>
    <div className="icon is-large">
      <img src={image} alt="" className="image is-rounded"/>
    </div>
  </LevelItem>
);

const GirlContent = ({ children }: WithChildren) => (
  <div className="card">
    <div className="card-content card is-size-5-mobile is-size-5-tablet is-size-4-desktop content">
      {children}
    </div>
  </div>
);

const GirlTitle = ({ thumbnail, name, quote }: GirlTitleProps) => (
  <Card>
    <CardContent className="card is-size-7-mobile is-size-5-tablet is-size-4-desktop">
      <Level isMobile>
        <LevelLeft className="shrink">
          {thumbnail && <GirlImage image={thumbnail}/>}
          <div className="level-item no-grow shrink">
            <p className="title is-size-4-mobile">{name}</p>
          </div>
        </LevelLeft>
      </Level>
      <p className="subtitle is-size-6-mobile">{quote}</p>
    </CardContent>
  </Card>
);

export const Girl = (options: GirlProps & WithChildren) => (
  <div className="girl-section" style={{ backgroundColor: options.color }}>
    <Columns isMobile className="narrow-width">
      <Column isSize="1/4" className="girl-image-column">
        <img src={options.image} alt="" className="image girl"/>
      </Column>
      <Column className="girl-content">
        <Section>
          <Content>
            <Columns>
              <Column>
                <GirlTitle
                  thumbnail={options.thumbnail}
                  name={options.name}
                  quote={options.quote}
                />
                <br/>
                <GirlContent>{options.children}</GirlContent>
              </Column>
              <Column>
                <GirlList name="Strengths" items={options.strengths}/>
                <br/>
                <GirlList name="Weaknesses" items={options.weaknesses}/>
              </Column>
            </Columns>
          </Content>
        </Section>
      </Column>
    </Columns>
  </div>
);

export const MarkdownGirl = (props: GirlProps & { html: string }) => {
  const { name, quote } = props;
  const parsed = name.toLowerCase().replace(/\s+/g, "-");
  const asset = girlAssets[parsed];

  return (
    <Girl color={props.color}
          image={asset.base}
          quote={quote}
          name={name}
          thumbnail={asset.thumbnail}
          weaknesses={props.weaknesses}
          strengths={props.strengths}
    >
      <div dangerouslySetInnerHTML={{ __html: props.html }}/>
    </Girl>
  );
};