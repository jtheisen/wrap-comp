# A small helper to derive Components from existing ones

The current state supports only the `className` prop to agument with more defaults,
but that is still useful for wrapping `div`s:

```
export const Row = wrapComp("div", "flex");
```

Such a wrapped div can then be wrapped again, adding more classes:

```
export const RowReverse = wrapComp(Row, "flex-row-reverse space-x-reverse");
```

# Using the tool

This isn't an npm package, the wrapper is merely the funciton `wrapComp` in `App.tsx`
with tests being in `App.test.tsx`.
