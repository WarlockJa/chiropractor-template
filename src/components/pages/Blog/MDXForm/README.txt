Points to remember when adding new Parts, Elements, MDX:

    1) Adding new Part:
mdxtypes.d.ts >>
    add new Part type
    modify TNonHeroParts, TAllBlogParts

lookupTablesMDXParts >>
    add new Part object to lookupTable_Parts
    add conversion to MDX for the new Part in lookupTable_PartsToMDX
    add insert icon data for the new Part in lookupTable_InsertElements

    if added part is not editable add type number to NoEditPartTypes array

    if added part uses images add part type to PartsWithImages and a switch case to getUsedImagesArray to get used images ids

partsToMDXParser >>
    add new switch case for the Part, with fields to replace

mdx (folder) >>
    add new Part display component
MDXRemoteWrapper >>
    add new display component to MDXRemote {components: {...<Display Components>}}

    -- past from here only for editable parts --
FormParts (folder) >>
    add new Part edit component
FormPartsSelector >>
    add edit component for the new Part in switch based on type