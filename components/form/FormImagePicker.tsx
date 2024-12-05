"use client"

import { useEffect, useState } from "react";
import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { defaultBgImages } from "@/constants/images";
import Link from "next/link";
import FormErrors from "./FormErrors";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
}

const FormImagePicker = ({
    id,
    errors,
}: FormPickerProps) => {

    const { pending } = useFormStatus();
    const [images, setImages] = useState<Array<Record<string, any>>>(defaultBgImages);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedImageId, setSelectedImageId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                console.log("fetching images")
                /* const result = await unsplash.photos.getRandom({
                    query: "nature",
                    //collectionIds: ["317099"],
                    count: 9
                });

                if (result && result.response) {
                    const fetchedImages = (result.response as Array<Record<string, any>>)
                    setImages(fetchedImages)
                } else {
                    console.error("Error fetching images")
                    setImages([])
                } */
            } catch (error) {
                console.log(error)
                setImages(defaultBgImages)
            } finally {
                setIsLoading(false)
            }
        };

        fetchImages();
    }, []);

    if (isLoading) {
        return <div className="flex items-center justify-center p-5">
            <Loader2 className="h-6 w-6 animate-spin" />
        </div>
    }
    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 my-2">
                {images.map((image) => (
                    <div key={image.id}
                        className={`cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted
                        ${pending ? "opacity-50 hover:opacity-50 cursor-auto" : ""}`}
                        onClick={() => {
                            if (pending) return;
                            setSelectedImageId(image.id)
                        }}>
                        <input
                            type="radio"
                            name={id}
                            id={id}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                            disabled={pending}
                            checked={selectedImageId === image.id} />
                        <Image
                            alt="unsplash image"
                            src={image.urls.thumb}
                            fill
                            className="object-cover rounded-sm" />
                        {selectedImageId === image.id && (
                            <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                                <Check className="h-6 w-6 text-white" />
                            </div>
                        )}
                        <Link
                            href={image.links.html}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 text-[8px] absolute bottom-0 w-full p-0.5 text-white truncate hover:underline bg-black/60">
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
            <FormErrors id="unsplash-image" errors={errors} />
        </div>
    )
}

export default FormImagePicker