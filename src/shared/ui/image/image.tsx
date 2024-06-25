import React, {FC, memo} from 'react';

interface IProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt?: string;
}

export const Image: FC<IProps> = memo(({src, ...props}) => {
    return (
        <picture>
            <source type="image/avif"/>
            <source type="image/webp"/>
            <img
                src={src}
                loading="lazy"
                decoding="async"
                alt={props.alt ?? ""}
            />
        </picture>
    );
});
