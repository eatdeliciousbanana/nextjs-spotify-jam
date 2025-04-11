import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Image from "next/image";

const SearchForm = () => {
  return (
    <ComponentCard title="Search Fields">
      <div className="space-y-6">
        <div className="max-w-full">
          <div className="inline-flex items-center shadow-theme-xs">
            <Button
              size="sm"
              variant="primary"
              className="sm:px-6 rounded-none first:rounded-l-lg last:rounded-r-lg"
            >
              Artist
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="sm:px-6 rounded-none first:rounded-l-lg last:rounded-r-lg"
            >
              Album
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="sm:px-6 rounded-none first:rounded-l-lg last:rounded-r-lg"
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
            <Input type="text" placeholder="Type to search..." />
          </div>
        </div>
      </div>
    </ComponentCard>
  );
};

export default SearchForm;
