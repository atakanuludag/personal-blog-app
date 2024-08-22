// ** next
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

// ** models
import ArticleModel from "@/models/ArticleModel";
import PageModel from "@/models/PageModel";

// ** services
import ArticleService from "@/services/ArticleService";
import PageService from "@/services/PageService";

// ** config
import { APP_URL, SITE_TITLE } from "@/config";

export const size = {
  width: 1200,
  height: 630,
};
export const runtime = "edge";
export const contentType = "image/png";

type BlogGuidProps = {
  params: { guid: string };
};

type DataProps = {
  type: "article" | "page" | null;
  item: ArticleModel | PageModel | null;
};

const getData = async (guid: string) => {
  let data: DataProps = {
    type: null,
    item: null,
  };
  const article = await ArticleService.getItemByGuid(guid);
  if (!article || !article?.data?.guid) {
    const page = await PageService.getItemByGuid(guid);
    if (page && page?.data?.guid) {
      data = {
        type: "page",
        item: page.data,
      };
    }
  } else {
    data = {
      type: "article",
      item: article.data,
    };
  }

  return data;
};

export async function generateImageMetadata({
  params: { guid },
}: BlogGuidProps) {
  const data = await getData(guid);
  return [
    {
      alt: data.item?.title,
      id: "image",
    },
  ];
}

export default async function Image({ params: { guid } }: BlogGuidProps) {
  const data = await getData(guid);

  if (!data.item) return notFound();

  const fontLight = await fetch(
    new URL("../../../../public/fonts/Inter_24pt-Light.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const fontBold = await fetch(
    new URL("../../../../public/fonts/Inter_24pt-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#000",
          backgroundImage: `url(${APP_URL}/images/og-bg-image.jpg)`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          color: "#fff",
          padding: "30px",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "InterBold",
            fontSize: 40,
            fontWeight: 100,
          }}
        >
          {SITE_TITLE}
        </div>
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          {data.item.title}
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              padding: 10,
              backgroundColor: "#383838",
              borderRadius: 5,
              fontSize: 20,
              color: "#fff",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>
              {/* eslint-disable-next-line @next/next/no-img-element  */}
              <img
                src={`${APP_URL}/icons/right-circle-icon.png`}
                alt=""
                width={20}
                height={20}
              />
            </span>

            <span
              style={{
                marginLeft: 10,
              }}
            >
              Makaleyi Oku
            </span>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "InterLight",
          data: fontLight,
          style: "normal",
        },
        {
          name: "InterBold",
          data: fontBold,
          style: "normal",
        },
      ],
    }
  );
}
