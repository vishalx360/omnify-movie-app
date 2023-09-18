import fallbackImage from "@/../public/placeholder.png"
import Image, { type ImageProps } from 'next/image'
import { useEffect, useState } from 'react'


type ImageWithFallbackProps = {
    fallback?: ImageProps["src"]
    src: ImageProps["src"]
}
const ImageWithFallback = ({
    fallback = fallbackImage,
    alt,
    src,
    ...props
}: ImageProps & ImageWithFallbackProps) => {
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(false)
    }, [src])

    return (
        <Image
            alt={alt}
            onError={() => setError(true)}
            src={error ? fallback : src}
            {...props}
        />
    )
}
export default ImageWithFallback