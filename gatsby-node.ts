import type { GatsbyNode } from 'gatsby';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

type GatsbyNodeAPI<T extends keyof GatsbyNode> = GatsbyNode[T] extends infer U
  ? U extends (...args: infer Params) => any
    ? (...args: Params) => void | Promise<void>
    : never
  : never;

export const onCreateBabelConfig: GatsbyNodeAPI<'onCreateBabelConfig'> = ({
  actions,
}) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-polished',
    options: {},
  });
};

const gql = String.raw;

export const createSchemaCustomization: GatsbyNodeAPI<'createSchemaCustomization'> = ({
  actions,
}) => {
  actions.createTypes(gql`
    type TranslationMessages implements Node {
      id: ID!
      language: String!
    }

    type Target implements Node @dontInfer {
      language: String!
      translations: TranslationMessages @link(by: "language", from: "language")
      introduce: Introduce! @link(by: "language", from: "language")
      skill: Skill! @link(by: "language", from: "language")
      experience: Experience! @link(by: "language", from: "language")
      project: Project! @link(by: "language", from: "language")
      opensource: Opensource! @link(by: "language", from: "language")
      presentation: Presentation! @link(by: "language", from: "language")
      paper: Paper! @link(by: "language", from: "language")
      education: Education! @link(by: "language", from: "language")
      etc: Etc! @link(by: "language", from: "language")
    }

    type Introduce implements Node {
      language: String!
      title: String!
      name: String!
      email: String
      phone: String
      github: String
      facebook: String
      instagram: String
      linkedIn: String
      youtube: String
      updatedAt: Date
      description: String
    }

    type SkillCategoryData {
      name: String!
      level: Int!
    }

    type SkillCategory {
      category: String!
      data: [SkillCategoryData]!
    }

    type Skill implements Node {
      language: String!
      title: String!
      criteria: [String!]!
      category: [SkillCategory]!
    }

    interface DateData {
      startDate: Date!
      endDate: Date
    }

    interface DescriptionData {
      description: [String]!
    }

    type ExperienceData implements DateData & DescriptionData {
      title: String!
      position: String
      startDate: Date!
      endDate: Date
      description: [String!]!
      skill: [String!]!
    }

    type Experience implements Node {
      language: String!
      title: String!
      data: [ExperienceData]!
    }

    type ProjectDescriptionData {
      title: String!
      detail: [String!]!
    }

    type ProjectData implements DateData {
      title: String!
      company: String
      startDate: Date!
      endDate: Date
      description: [ProjectDescriptionData!]!
    }

    type Project implements Node {
      language: String!
      title: String!
      data: [ProjectData]!
    }

    type LinkData implements DescriptionData {
      title: String!
      link: String!
      description: [String!]!
    }

    type Opensource implements Node {
      language: String!
      title: String!
      data: [LinkData]!
    }

    type Presentation implements Node {
      language: String!
      title: String!
      data: [LinkData]!
    }

    type Paper implements Node {
      language: String!
      title: String!
      data: [LinkData]!
    }

    type EducationData implements DateData {
      title: String!
      major: String!
      startDate: Date!
      endDate: Date
    }

    type Education implements Node {
      language: String!
      title: String!
      data: [EducationData]!
    }

    type EtcData implements DateData & DescriptionData {
      title: String!
      startDate: Date!
      endDate: Date
      description: [String!]!
    }

    type Etc implements Node {
      language: String!
      title: String!
      data: [EtcData!]!
    }
  `);
};

export const sourceNodes: GatsbyNodeAPI<'sourceNodes'> = ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const targets = ['ko', 'en'];
  let defaultMessages;
  type YamlItem = {
    typename: string;
    title: string;
  };
  type YamlDocs = {
    introduce: YamlItem;
    skill: YamlItem;
    experience: YamlItem;
    project: YamlItem;
    opensource: YamlItem;
    presentation: YamlItem;
    paper: YamlItem;
    education: YamlItem;
    etc: YamlItem;
    translations: Record<string, string>;
  };

  for (const target of targets) {
    const yamlFile = yaml.safeLoad(
      fs.readFileSync(`./data/${target}.yml`, 'utf-8'),
    );
    const {
      introduce,
      skill,
      experience,
      project,
      opensource,
      presentation,
      paper,
      education,
      etc,
      translations,
    } = yamlFile as YamlDocs;

    actions.createNode({
      ...introduce,
      id: createNodeId(`Introduce: ${target}`),
      language: target,
      internal: {
        type: introduce.typename,
        contentDigest: createContentDigest(introduce),
      },
    });

    actions.createNode({
      ...skill,
      id: createNodeId(`Skill: ${target}`),
      language: target,
      internal: {
        type: skill.typename,
        contentDigest: createContentDigest(skill),
      },
    });

    actions.createNode({
      ...experience,
      id: createNodeId(`Experience: ${target}`),
      language: target,
      internal: {
        type: experience.typename,
        contentDigest: createContentDigest(experience),
      },
    });

    actions.createNode({
      ...project,
      id: createNodeId(`Project: ${target}`),
      language: target,
      internal: {
        type: project.typename,
        contentDigest: createContentDigest(project),
      },
    });

    actions.createNode({
      ...opensource,
      id: createNodeId(`Opensource: ${target}`),
      language: target,
      internal: {
        type: opensource.typename,
        contentDigest: createContentDigest(opensource),
      },
    });

    actions.createNode({
      ...presentation,
      id: createNodeId(`Presentation: ${target}`),
      language: target,
      internal: {
        type: presentation.typename,
        contentDigest: createContentDigest(presentation),
      },
    });

    actions.createNode({
      ...paper,
      id: createNodeId(`Paper: ${target}`),
      language: target,
      internal: {
        type: paper.typename,
        contentDigest: createContentDigest(paper),
      },
    });

    actions.createNode({
      ...education,
      id: createNodeId(`Education: ${target}`),
      language: target,
      internal: {
        type: education.typename,
        contentDigest: createContentDigest(education),
      },
    });

    actions.createNode({
      ...etc,
      id: createNodeId(`etc: ${target}`),
      language: target,
      internal: {
        type: etc.typename,
        contentDigest: createContentDigest(etc),
      },
    });

    actions.createNode({
      language: target,
      id: createNodeId(`Target: ${target}`),
      internal: {
        type: 'Target',
        contentDigest: createContentDigest(target),
      },
    });
    const messageEntries = Object.entries(translations).map(value => {
      const [translationKey, translationValue] = value;
      return [translationKey, { text: translationValue }];
    });
    const messages = Object.fromEntries(messageEntries);
    if (!defaultMessages) {
      defaultMessages = messages;
    }
    actions.createNode({
      messages,
      language: target,
      id: createNodeId(`TranslationMessages > ${target}`),
      internal: {
        type: 'TranslationMessages',
        contentDigest: createContentDigest(translations),
      },
    });
    const renderTextFragments = fields => {
      return `fragment TranslationMessages_allMessages on TranslationMessagesMessages {
      ${fields.map(field => `${field.replace(/-/g, '_')} { text }`).join('\n')}
    }`;
    };
    if (defaultMessages) {
      void fs.writeFileSync(
        path.resolve('src/__generated__', 'defaultMessages.json'),
        JSON.stringify(defaultMessages, null, 2),
        'utf8',
      );
      const textFields = Object.entries(defaultMessages).map(([key]) => key);
      void fs.writeFileSync(
        path.resolve('src/__generated__', 'allTranslationsFragment.js'),
        '/* eslint-disable */' +
          '\n' +
          "import { graphql } from 'gatsby';" +
          '\n' +
          'export const fragments = graphql`' +
          '\n' +
          `${textFields.length > 0 ? renderTextFragments(textFields) : ''}` +
          '\n' +
          '`;',
        'utf8',
      );
    }
  }
};

export const createPages: GatsbyNodeAPI<'createPages'> = async ({
  graphql,
  actions,
}) => {
  type CreatePagesQuery = {
    allTarget: {
      nodes: Array<{
        id: string;
        language: string;
      }>;
    };
  };
  const { data, errors } = await graphql<CreatePagesQuery>(gql`
    {
      allTarget {
        nodes {
          id
          language
        }
      }
    }
  `);

  if (errors) {
    throw errors;
  }

  for (const target of data.allTarget.nodes) {
    actions.createPage({
      component: require.resolve('./src/templates/{Target.language}/index.tsx'),
      path: `/${target.language}/`,
      context: {
        targetId: target.id,
        language: target.language,
      },
    });
  }
};
