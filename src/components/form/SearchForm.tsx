"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchForm = ({
  searchParams,
}: {
  searchParams: { q: string; type: string };
}) => {
  const router = useRouter();
  const [data, setData] = useState(searchParams);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(data);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ComponentCard title="Search Fields">
        <div className="space-y-6">
          <div className="max-w-full">
            <div className="inline-flex items-center shadow-theme-xs">
              <Button
                type="button"
                size="sm"
                variant={data.type === "artist" ? "primary" : "outline"}
                className="sm:px-6 rounded-none first:rounded-l-lg last:rounded-r-lg"
                onClick={() =>
                  setData({
                    ...data,
                    type: "artist",
                  })
                }
              >
                Artist
              </Button>
              <Button
                type="button"
                size="sm"
                variant={data.type === "album" ? "primary" : "outline"}
                className="sm:px-6 rounded-none first:rounded-l-lg last:rounded-r-lg"
                onClick={() =>
                  setData({
                    ...data,
                    type: "album",
                  })
                }
              >
                Album
              </Button>
              <Button
                type="button"
                size="sm"
                variant={data.type === "track" ? "primary" : "outline"}
                className="sm:px-6 rounded-none first:rounded-l-lg last:rounded-r-lg"
                onClick={() =>
                  setData({
                    ...data,
                    type: "track",
                  })
                }
              >
                Track
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex">
            <div className="px-2 py-2.5">
              <button type="submit">
                <Image
                  width={26}
                  height={26}
                  src="/images/icons/search.svg"
                  alt="search"
                />
              </button>
            </div>
            <div className="w-full">
              <Input
                type="text"
                placeholder="Type to search..."
                defaultValue={data.q}
                onChange={(e) =>
                  setData({
                    ...data,
                    q: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </ComponentCard>
    </Form>
  );
};

export default SearchForm;
