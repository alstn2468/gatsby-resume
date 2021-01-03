import type { GatsbyConfig, IPluginRefObject } from 'gatsby';
import type { FileSystemOptions } from 'gatsby-source-filesystem';
import type { PluginOptions as TypegenPlugionOptions } from 'gatsby-plugin-typegen/types';
import type { PluginOptions as ModuleResolverOptions } from 'gatsby-plugin-module-resolver/types';

type PluginRef<Resolve extends string, Options = unknown> = Omit<
  IPluginRefObject,
  keyof {
    resolve: Resolve;
    options: Options;
  }
> & { resolve: Resolve; options: Options };

if (!process.env.PUBLIC_URL) {
  throw new Error('PUBLIC_URL 환경변수를 세팅해주세요');
}

const publicURL = new URL(process.env.PUBLIC_URL);

type PluginConfig =
  | string
  | PluginRef<'gatsby-plugin-manifest'>
  | PluginRef<'gatsby-source-filesystem', FileSystemOptions>
  | PluginRef<'gatsby-plugin-typegen', TypegenPlugionOptions>
  | PluginRef<'gatsby-plugin-module-resolver', ModuleResolverOptions>;

export const siteMetadata: GatsbyConfig['siteMetadata'] = {
  siteUrl: publicURL.origin,
  title: 'Gatsby Resume',
  description: 'Static website resume with GatsbyJS, TypeScript',
};

export const pathPrefix: GatsbyConfig['pathPrefix'] = '/Gatsby_Resume';

export const plugins: PluginConfig[] = [
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-emotion',
  'gatsby-plugin-pnpm',
  'gatsby-plugin-svgr',
  'gatsby-plugin-react-helmet-async',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: 'gatsby-plugin-typegen',
    options: {
      emitSchema: {
        'src/__generated__/gatsby-schema.graphql': true,
        'src/__generated__/gatsby-schema.json': true,
      },
      emitPluginDocuments: {
        'src/__generated__/gatsby-plugin-documents.graphql': true,
      },
    },
  },
  {
    resolve: 'gatsby-plugin-module-resolver',
    options: {
      root: './',
      aliases: {
        '~': '.',
      },
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Gatsby Resume',
      short_name: 'Gatsby Resume',
      description: 'Static website resume with GatsbyJS, TypeScript',
      start_url: '/',
      lang: 'ko',
      background_color: '#FFFFFF',
      theme_color: '#000000',
      display: 'minimal-ui',
      icon: 'src/images/favicon.png',
    },
  },
];
