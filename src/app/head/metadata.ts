import type { Metadata } from 'next';

const TITLE = '코인 정보';

const DESCRIPTION = '코인 정보';

const KEYWORDS = `코인 , 가상화폐 , 비트코인 , 이더리움 , 리플 , 라이트코인 , 비트코인캐시 , 에이다 , 솔라나 , 도지코인 , 폴카닷 , 체인링크 , 유니스왑 , 파일코인 , 알고랜드 , 스텔라루멘 , 테조스 , 아발란체 , 디센트럴랜드 , 샌드박스 , 엑시인피니티 , 엔진코인 , 클레이튼 , 루나 , 테라 , 메타버스 코인 , NFT 코인 , 디파이 코인 , 블록체인 게임 코인`;

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
}

export default function getMetadata(
  { title = TITLE, description = DESCRIPTION, keywords = KEYWORDS, url }: Props = {
    title: TITLE,
    description: DESCRIPTION,
    keywords: KEYWORDS,
  }
): Metadata {
  return {
    title: `${title} ${process.env.ENV ? ` | 모바일웹(${process.env.COMPONENT_VERSION})` : ''}`,
    description,
    keywords,
    formatDetection: { telephone: false },
    applicationName: '',
    openGraph: {
      type: 'website',
      title,
      description,
      // images: {
      // url: '',
      // },
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: '',
      site: '',
      creator: '',
    },
    appleWebApp: {
      title: TITLE,
      capable: false,
      // statusBarStyle: 'black-translucent' as const,
    },
  };
}
