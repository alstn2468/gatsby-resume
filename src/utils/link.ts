type Internal = {
  type: 'internal',
  url: URL,
};

type External = {
  type: 'external',
  url: URL,
};

export type LinkType = Internal | External;

export function isInternalLink(link: LinkType): link is Internal {
  return link.type === 'internal';
}

export function isExternalLink(link: LinkType): link is External {
  return link.type === 'external';
}

export function linkToString(link: LinkType): string {
  return mapLinkType(link, {
    internal: link => link.url.pathname + link.url.search + link.url.hash,
    external: link => link.url.href,
  });
}

export function linkToId(link: LinkType): string | undefined {
  return mapLinkType(link, {
    internal: link => link.url.hash.slice(1),
    external: () => undefined,
  });
}

export function linkIsEqual(link1: LinkType, link2: LinkType): boolean {
  return linkToString(link1) === linkToString(link2);
}

export function parseLink(urlString: string, baseOrigin: string): LinkType {
  const startsWithPath = urlString.startsWith('/');

  let url: URL | null = null;
  try {
    url = new URL(`${startsWithPath ? baseOrigin : ''}${urlString}`);
  } catch {}

  if (!url) {
    throw new Error(`Failed to parse link, invalid format. url: ${urlString}`);
  }

  const origin = url.origin ?? baseOrigin;
  const sameOrigin = origin === baseOrigin;
  return { type: sameOrigin ? 'internal' : 'external', url };
}

export function mapLinkType<ResultForInternal, ResultForExternal>(
  link: LinkType,
  mapper: {
    internal: (link: Internal) => ResultForInternal,
    external: (link: External) => ResultForExternal,
  },
): ResultForInternal | ResultForExternal {
  if (isInternalLink(link)) {
    return mapper.internal(link);
  } else {
    return mapper.external(link);
  }
}
