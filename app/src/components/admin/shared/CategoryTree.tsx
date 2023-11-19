"use client";

// ** react
import { useEffect, useState } from "react";

// ** mui
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";

// ** icons
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import AddIcon from "@mui/icons-material/Add";

// ** third party
import CheckboxTree from "react-checkbox-tree";

// ** hooks
import useCategoryQuery from "@/hooks/queries/useCategoryQuery";

// ** models
import CategoryModel from "@/models/CategoryModel";

type CategoryTreeModel = {
  value: string;
  label: string;
  children?: CategoryTreeModel[];
};

type CategoryTreeProps = {
  checkModel?: "leaf" | "all";
  selected: string[];
  setSelected: (data: string[]) => void;
  expanded: string[];
};

const convertTreeData = (data: CategoryModel[], pid: null | string) => {
  return data.reduce((r, e) => {
    if (pid == e.parent?._id) {
      const object: CategoryTreeModel = {
        label: e.title,
        value: e._id,
      };
      const children = convertTreeData(data, e._id);
      if (children.length) object.children = children;
      if (object) r.push(object);
    }
    return r;
  }, [] as CategoryTreeModel[]);
};

export default function CategoryTree({
  selected,
  setSelected,
  expanded: _expanded,
  checkModel = "all",
}: CategoryTreeProps) {
  const [stateSelected, setStateSelected] = useState(new Array<string>());
  const [items, setItems] = useState(new Array<CategoryTreeModel>());
  const [filteredItems, setFilteredItems] = useState(
    new Array<CategoryTreeModel>()
  );

  const [searchText, setSearchText] = useState<string>("");
  const [expanded, setExpanded] = useState<string[]>([]);

  const { useCategoriesQuery } = useCategoryQuery();
  const categories = useCategoriesQuery();

  const filterNodes = (
    filtered: CategoryTreeModel[],
    node: CategoryTreeModel
  ) => {
    const children = node.children?.reduce(filterNodes, []);

    if (
      // Node's label matches the search string
      node.label.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) >
        -1 ||
      // Or a children has a matching node
      children?.length
    ) {
      filtered.push({ ...node, children });
    }

    return filtered;
  };

  useEffect(() => {
    setExpanded(_expanded);
  }, [_expanded]);

  useEffect(() => {
    setStateSelected(selected);
  }, [selected]);

  useEffect(() => {
    const categoriesData = categories.data as CategoryModel[];
    if (!categoriesData) return;
    setItems(convertTreeData(categoriesData, null));
    //setStateSelected(selected)
  }, [categories.data]);

  useEffect(() => {
    setFilteredItems(items.reduce(filterNodes, []));
  }, [searchText]);

  if (categories.isLoading)
    return (
      <Box>
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} variant="text" sx={{ fontSize: "1rem" }} />
        ))}
      </Box>
    );

  return (
    <Box>
      <TextField
        fullWidth
        size="small"
        label="Kategori Ara..."
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Box
        width={"100%"}
        mt={2}
        maxHeight={"250px"}
        sx={{ overflowY: "scroll" }}
      >
        <CheckboxTree
          showNodeIcon={false}
          onClick={() => {}}
          nodes={searchText !== "" ? filteredItems : items}
          checked={stateSelected}
          checkModel={checkModel}
          expanded={expanded}
          onCheck={(checked) => setSelected(checked)}
          onExpand={(expanded) => setExpanded(expanded)}
          iconsClass="checkbox-tree-icons"
          icons={{
            check: <CheckBoxIcon />,
            uncheck: <CheckBoxOutlineBlankIcon />,
            halfCheck: (
              <CheckBoxIcon
                sx={{ "&.MuiSvgIcon-root": { color: grey[700] } }}
              />
            ),
            expandClose: <AddIcon />,
            expandOpen: <HorizontalRuleIcon />,
            expandAll: <></>,
            collapseAll: <></>,
            parentClose: <></>,
            parentOpen: <></>,
            leaf: <></>,
          }}
        />
      </Box>
    </Box>
  );
}
