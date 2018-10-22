
/*
* ..................
*
* */

function FiberNode(
    tag: WorkTag,
    pendingProps: mixed,
    key: null | string,
    mode: TypeOfMode,
) {
    // Instance
    this.tag = tag;
    this.key = key;
    this.type = null;
    this.stateNode = null;

    // Fiber
    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;

    this.ref = null;

    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.updateQueue = null;
    this.memoizedState = null;
    this.firstContextDependency = null;

    this.mode = mode;

    // Effects
    this.effectTag = NoEffect;
    this.nextEffect = null;

    this.firstEffect = null;
    this.lastEffect = null;

    this.expirationTime = NoWork;
    this.childExpirationTime = NoWork;

    this.alternate = null;

    if (enableProfilerTimer) {
        this.actualDuration = 0;
        this.actualStartTime = -1;
        this.selfBaseDuration = 0;
        this.treeBaseDuration = 0;
    }

    if (__DEV__) {
        this._debugID = debugCounter++;
        this._debugSource = null;
        this._debugOwner = null;
        this._debugIsCurrentlyTiming = false;
        if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
            Object.preventExtensions(this);
        }
    }
}

const createFiber = function(
    tag: WorkTag,
    pendingProps: mixed,
    key: null | string,
    mode: TypeOfMode,
): Fiber  {
    // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
    return new FiberNode(tag, pendingProps, key, mode);
};

export function createHostRootFiber(isConcurrent: boolean): Fiber {
  let mode = isConcurrent ? ConcurrentMode | StrictMode : NoContext;

  if (enableProfilerTimer && isDevToolsPresent) {
    // Always collect profile timings when DevTools are present.
    // This enables DevTools to start capturing timing at any point–
    // Without some nodes in the tree having empty base times.
    mode |= ProfileMode;
  }

  return createFiber(HostRoot, null, null, mode);
}

/*
* ..................
*
* */