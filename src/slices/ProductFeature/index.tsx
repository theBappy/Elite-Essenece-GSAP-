import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { createClient } from "@/prismicio";
import { formatPrice } from "@/utils/formatter";
import { ButtonLink } from "@/components/button-link";

export type ProductFeatureProps =
  SliceComponentProps<Content.ProductFeatureSlice>;

const ProductFeature: FC<ProductFeatureProps> = async ({ slice }) => {
  const client = createClient();

  const fragnance = isFilled.contentRelationship(slice.primary.fragnance)
    ? await client.getByID<Content.FragnanceDocument>(
        slice.primary.fragnance.id,
      )
    : null;

  const formattedPrice = formatPrice(fragnance?.data.price);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden bg-black py-16 text-white md:py-24"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3 lg:grid-rows-[auto,auto]">
        <FadeIn
          className="translate-y-16 opacity-0 lg:col-span-2 lg:row-span-2"
          vars={{ duration: 1 }}
          start="top 70%"
        >
          <PrismicNextImage
            field={slice.primary.feature_image}
            className="h-auto w-full object-cover"
          />
        </FadeIn>
        <FadeIn className="translate-y-16 space-y-6 self-start bg-white/10 p-10 opacity-0 lg:col-start-3 lg:row-start-1">
          <h2 className="text-3xl leading-tight font-semibold md:text-4xl">
            <PrismicText field={slice.primary.heading} />
          </h2>
          <div className="max-w-lg text-base text-gray-300">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </FadeIn>

        {/* fragnance */}
        <FadeIn
          className="animate-in relative translate-y-16 self-end bg-white/10 opacity-0 will-change-transform"
          vars={{ duration: 1, delay: 1 }}
        >
          <PrismicNextImage
            field={fragnance?.data.bottle_image}
            className="mx-auto mt-10 w-full -rotate-12 md:-mt-20"
          />
          <div className="flex justify-between p-10 pt-4">
            <div className="space-y-1">
              <h3 className="font-display text-4xl">
                <PrismicText
                  field={fragnance?.data.title}
                  fallback="Fragnance"
                />
              </h3>
              <p className="mt-2 text-gray-400">Eau De Perfume Essence</p>
              <ButtonLink
                document={fragnance}
                variant="Secondary"
                className="mt-6"
              >
                Shop Now
              </ButtonLink>
            </div>
            <p className="mt-4 text-gray-100" aria-label="Product Price">
              <span>{formattedPrice}</span>
            </p>
          </div>
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default ProductFeature;
