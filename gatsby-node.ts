import type { GatsbyNode } from "gatsby";

type $FIXME = any;

type GatsbyNodeAPI<T extends keyof GatsbyNode> = GatsbyNode[T] extends infer U
  ? U extends (...args: infer Params) => any
    ? (...args: Params) => void | Promise<void>
    : never
  : never;

export const onCreateBabelConfig: GatsbyNodeAPI<"onCreateBabelConfig"> = ({
  actions,
}) => {
  actions.setBabelPlugin({
    name: "babel-plugin-polished",
    options: {},
  });
};

const gql = String.raw;

export const createSchemaCustomization: GatsbyNodeAPI<"createSchemaCustomization"> = ({
  actions,
}) => {
  actions.createTypes(gql`
    type Target implements Node @dontInfer {
      language: String!
    }
  `);
};

export const sourceNodes: GatsbyNodeAPI<"sourceNodes"> = ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const targets = ["ko", "en"];
  for (const target of targets) {
    actions.createNode({
      id: createNodeId(`Target: ${target}`),
      internal: {
        type: "target",
        contentDigest: createContentDigest(target),
      },
      language: target,
    });
  }
};

export const createPages: GatsbyNodeAPI<"createPages"> = async ({
  graphql,
  actions,
}) => {
  const { data, errors } = await graphql<$FIXME>(gql`
    {
      allTarget {
        nodes {
          id
          language
        }
      }
    }
  `);

  for (const target of data.allTarget.nodes) {
    actions.createPage({
      component: require.resolve("./src/templates/{Target.language}/index.tsx"),
      path: `/${target.language}/`,
      context: {
        targetId: target.id,
        language: target.language,
      },
    });
  }
};
