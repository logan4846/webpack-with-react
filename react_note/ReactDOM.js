//部分源码
//...
//获取第一个子节点 如果是document则返回html
function getReactRootElementInContainer(container: any) {
    if (!container) {
        return null;
    }

    if (container.nodeType === DOCUMENT_NODE) {
        return container.documentElement;
    } else {
        return container.firstChild;
    }
}

//
function shouldHydrateDueToLegacyHeuristic(container) {
    const rootElement = getReactRootElementInContainer(container);
    return !!(
        rootElement &&
        rootElement.nodeType === ELEMENT_NODE &&
        rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME)
    );
}

function legacyCreateRootFromDOMContainer(
    container: DOMContainer,
    forceHydrate: boolean,
): Root {
    const shouldHydrate =
        forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
    //首次加载清除子节点
    if (!shouldHydrate) {
        let warned = false;
        let rootSibling;
        while ((rootSibling = container.lastChild)) {
            if (__DEV__) {
                if (
                    !warned &&
                    rootSibling.nodeType === ELEMENT_NODE &&
                    (rootSibling: any).hasAttribute(ROOT_ATTRIBUTE_NAME)
                ) {
                    warned = true;
                    warningWithoutStack(
                        false,
                        'render(): Target node has markup rendered by React, but there ' +
                        'are unrelated nodes as well. This is most commonly caused by ' +
                        'white-space inserted around server-rendered markup.',
                    );
                }
            }
            container.removeChild(rootSibling);
        }
    }
    if (__DEV__) {
        if (shouldHydrate && !forceHydrate && !warnedAboutHydrateAPI) {
            warnedAboutHydrateAPI = true;
            lowPriorityWarning(
                false,
                'render(): Calling ReactDOM.render() to hydrate server-rendered markup ' +
                'will stop working in React v17. Replace the ReactDOM.render() call ' +
                'with ReactDOM.hydrate() if you want React to attach to the server HTML.',
            );
        }
    }
    // Legacy roots are not async by default.
    const isConcurrent = false;
    return new ReactRoot(container, isConcurrent, shouldHydrate);
}

/*
* legacyRenderSubtreeIntoContainer(
            null,
            element,
            container,
            false,
            callback,
        );
*/
function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>,//null
  children: ReactNodeList,//element
  container: DOMContainer,//container
  forceHydrate: boolean,//false
  callback: ?Function,//callback
) {
  // TODO: Ensure all entry points contain this check
    //验证节点类型
  invariant(
    isValidContainer(container),
    'Target container is not a DOM element.',
  );

  if (__DEV__) {
    topLevelUpdateWarnings(container);
  }

  // TODO: Without `any` type, Flow says "Property cannot be accessed on any
  // member of intersection type." Whyyyyyy.
  let root: Root = (container._reactRootContainer: any);
  if (!root) {
    // Initial mount
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate,
    );
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function() {
        const instance = DOMRenderer.getPublicRootInstance(root._internalRoot);
        originalCallback.call(instance);
      };
    }
    // Initial mount should not be batched.
    DOMRenderer.unbatchedUpdates(() => {
      if (parentComponent != null) {
        root.legacy_renderSubtreeIntoContainer(
          parentComponent,
          children,
          callback,
        );
      } else {
        root.render(children, callback);
      }
    });
  } else {
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function() {
        const instance = DOMRenderer.getPublicRootInstance(root._internalRoot);
        originalCallback.call(instance);
      };
    }
    // Update
    if (parentComponent != null) {
      root.legacy_renderSubtreeIntoContainer(
        parentComponent,
        children,
        callback,
      );
    } else {
      root.render(children, callback);
    }
  }
  return DOMRenderer.getPublicRootInstance(root._internalRoot);
}

/*
* ReactDom.render()方法
*
*
* */
const ReactDOM: Object = {

    render(
        element: React$Element<any>,
        container: DOMContainer,
        callback: ?Function,
    ) {
        return legacyRenderSubtreeIntoContainer(
            null,
            element,
            container,
            false,
            callback,
        );
    },
    //...
};
//.....

export default ReactDOM;
