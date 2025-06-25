"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { SearchIcon } from "@/icons";
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
          <div className="max-w-full overflow-auto">
            <div className="inline-flex items-center shadow-theme-xs">
              <Button
                type="button"
                size="sm"
                variant={data.type === "artist" ? "primary" : "outline"}
                className="sm:px-6 rounded-none rounded-l-lg ring-0! border-1 border-brand-500"
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
                className="sm:px-6 rounded-none ring-0! border-1 border-l-0 border-brand-500"
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
                className="sm:px-6 rounded-none ring-0! border-1 border-l-0 border-brand-500"
                onClick={() =>
                  setData({
                    ...data,
                    type: "track",
                  })
                }
              >
                Track
              </Button>
              <Button
                type="button"
                size="sm"
                variant={data.type === "playlist" ? "primary" : "outline"}
                className="sm:px-6 rounded-none rounded-r-lg ring-0! border-1 border-l-0 border-brand-500"
                onClick={() =>
                  setData({
                    ...data,
                    type: "playlist",
                  })
                }
              >
                Playlist
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex">
            <div className="px-2 py-3">
              <button type="submit">
                <SearchIcon className="text-gray-500 dark:text-gray-400" />
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
