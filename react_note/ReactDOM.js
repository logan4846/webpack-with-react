//部分源码
//...
/*
* 入口函数 render ======>  legacyRenderSubtreeIntoContainer;
* 将虚拟dom渲染成真实dom。
*
* */
//.........
/*
* ReactRoot相关
*
*
*
*/
function ReactRoot(
    container: Container,
    isConcurrent: boolean,
    hydrate: boolean,
) {
    // 执行后 ===> createFiberRoot(containerInfo, isConcurrent, hydrate);
    // createFiberRoot 位置：./react_dom_about/ReactFiberRoot.js
    const root = DOMRenderer.createContainer(container, isConcurrent, hydrate);
    this._internalRoot = root;
}
ReactRoot.prototype.render = function(
    children: ReactNodeList,
    callback: ?() => mixed,
): Work {
    const root = this._internalRoot;
    const work = new ReactWork();
    callback = callback === undefined ? null : callback;
    if (__DEV__) {
        warnOnInvalidCallback(callback, 'render');
    }
    if (callback !== null) {
        work.then(callback);
    }
    DOMRenderer.updateContainer(children, root, null, work._onCommit);
    return work;
};
ReactRoot.prototype.unmount = function(callback: ?() => mixed): Work {
    const root = this._internalRoot;
    const work = new ReactWork();
    callback = callback === undefined ? null : callback;
    if (__DEV__) {
        warnOnInvalidCallback(callback, 'render');
    }
    if (callback !== null) {
        work.then(callback);
    }
    DOMRenderer.updateContainer(null, root, null, work._onCommit);
    return work;
};
ReactRoot.prototype.legacy_renderSubtreeIntoContainer = function(
    parentComponent: ?React$Component<any, any>,
    children: ReactNodeList,
    callback: ?() => mixed,
): Work {
    const root = this._internalRoot;
    const work = new ReactWork();
    callback = callback === undefined ? null : callback;
    if (__DEV__) {
        warnOnInvalidCallback(callback, 'render');
    }
    if (callback !== null) {
        work.then(callback);
    }
    DOMRenderer.updateContainer(children, root, parentComponent, work._onCommit);
    return work;
};
ReactRoot.prototype.createBatch = function(): Batch {
    const batch = new ReactBatch(this);
    const expirationTime = batch._expirationTime;

    const internalRoot = this._internalRoot;
    const firstBatch = internalRoot.firstBatch;
    if (firstBatch === null) {
        internalRoot.firstBatch = batch;
        batch._next = null;
    } else {
        // Insert sorted by expiration time then insertion order
        let insertAfter = null;
        let insertBefore = firstBatch;
        while (
            insertBefore !== null &&
            insertBefore._expirationTime <= expirationTime
            ) {
            insertAfter = insertBefore;
            insertBefore = insertBefore._next;
        }
        batch._next = insertBefore;
        if (insertAfter !== null) {
            insertAfter._next = batch;
        }
    }

    return batch;
};



//获取第一个子节点 如果是document则返回html
function getReactRootElementInContainer(container: any) {
    if (!container) {
        return null;
    }
    //代表整个文档（DOM 树的根节点）。
    if (container.nodeType === DOCUMENT_NODE) {
        return container.documentElement;
    } else {
        return container.firstChild;
    }
}

//
function shouldHydrateDueToLegacyHeuristic(container) {
    const rootElement = getReactRootElementInContainer(container);//null
    return !!(
        rootElement &&  // 不为 null undefined ""
        rootElement.nodeType === ELEMENT_NODE &&   //  是否是一个元素节点 即 html标签
        rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME)  //是否包含“data-reactroot”属性
    );
}

function legacyCreateRootFromDOMContainer(
    container: DOMContainer,
    forceHydrate: boolean,
): Root {
    // shouldHydrate = false;
    const shouldHydrate =
        forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
    /*
    * 使用render()进行渲染 且 容器元素不包含“data-reactroot”属性 时执行
    * shouldHydrate 是否”注水“，同 hydrate方法，用于服务端渲染时再次做事件绑定
    * 这里的作用清空container：循环移除掉container的所有子节点
    */
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
    //默认情况下 继承根节点不是异步的
    const isConcurrent = false;
    return new ReactRoot(container, isConcurrent, shouldHydrate);
}

/*
*
*/
function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>,//null
  children: ReactNodeList,//element
  container: DOMContainer,//container
  forceHydrate: boolean,//false
  callback: ?Function,//callback
) {
    // 验证节点类型
  invariant(
    isValidContainer(container),
    'Target container is not a DOM element.',
  );

  if (__DEV__) {
      topLevelUpdateWarnings(container);
  }

  let root: Root = (container._reactRootContainer: any);
  if (!root) {
      // 生成root，附加fiber相关到_reactRootContainer
      /*
       root = container._reactRootContainer = {
          _internalRoot  = {
             current:{...,stateNode:xx}
             ...
          }
       }
      */
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate,
    );
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function() {
        const instance = DOMRenderer.getPublicRootInstance(root._internalRoot);
        originalCal0lback.call(instance);
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
    //服务端渲染时复用也叫hydrate“注水”
    hydrate(element: React$Node, container: DOMContainer, callback: ?Function) {
        // TODO: throw or warn if we couldn't hydrate?
        return legacyRenderSubtreeIntoContainer(
            null,
            element,
            container,
            true,
            callback,
        );
    },
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
