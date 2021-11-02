var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var repeat = function (string, count) {
    var result = '';
    for (var i = 0; i < count; i++) {
        result += string;
    }
    return result;
};
var DownArea = (function () {
    function DownArea(args) {
        var _a;
        var _b, _c, _d, _e, _f;
        this.minWidth = 464;
        this.minHeight = 120;
        this.tools = [];
        this.actions = (_a = {},
            _a['heading-1'] = { fn: this.addHeading },
            _a['heading-2'] = { fn: this.addHeading, args: [2] },
            _a['heading-3'] = { fn: this.addHeading, args: [3] },
            _a['heading-4'] = { fn: this.addHeading, args: [4] },
            _a['heading-5'] = { fn: this.addHeading, args: [5] },
            _a['heading-6'] = { fn: this.addHeading, args: [6] },
            _a['bold'] = { fn: this.addBold },
            _a['italic'] = { fn: this.addItalic },
            _a['bold-italic'] = { fn: this.addBoldItalic },
            _a['normal-link'] = { fn: this.addLink },
            _a['quick-link'] = { fn: this.addLink, args: [1] },
            _a['email'] = { fn: this.addEmail },
            _a['image'] = { fn: this.addImage },
            _a['blockquote'] = { fn: this.addBlockquote },
            _a['u-list'] = { fn: this.addUnorderedList },
            _a['o-list'] = { fn: this.addOrderedList },
            _a['sl-code'] = { fn: this.addSingleLineCode },
            _a['code-block'] = { fn: this.addCodeBlock },
            _a);
        this.element = args.elem;
        this.attr = (_b = args.attr) !== null && _b !== void 0 ? _b : {};
        this.textareaName = (_c = args.name) !== null && _c !== void 0 ? _c : null;
        this.textareaValue = (_d = args.value) !== null && _d !== void 0 ? _d : '';
        this.resize = (_e = args.resize) !== null && _e !== void 0 ? _e : DownArea.RESIZE_VERTICAL;
        this.hiddenTools = (_f = args.hide) !== null && _f !== void 0 ? _f : [];
        this.init();
    }
    DownArea.prototype.init = function () {
        var _a;
        if (this.element instanceof HTMLTextAreaElement) {
            var containerElement = document.createElement('div');
            if (this.attr.id) {
                containerElement.id = this.attr.id.join(' ');
            }
            if (this.attr.class) {
                (_a = containerElement.classList).add.apply(_a, this.attr.class);
            }
            this.textarea = this.element;
            this.element.parentNode.replaceChild(containerElement, this.element);
            this.element = containerElement;
            this.createElements();
        }
        else {
            this.createElements();
        }
        this.registerElements();
        this.initResizer();
        this.listenTools();
        this.initDropdowns();
        this.listenTextareaEvents();
        this.setTextareaSize();
    };
    DownArea.prototype.createElements = function () {
        var _a;
        var downareaElement = document.createElement('div');
        downareaElement.classList.add('downarea');
        this.element.appendChild(downareaElement);
        var resizer = document.createElement('div');
        resizer.classList.add('resizer');
        downareaElement.appendChild(resizer);
        var wrapper = document.createElement('div');
        wrapper.classList.add('downarea-wrapper');
        downareaElement.appendChild(wrapper);
        var toolbar = document.createElement('div');
        toolbar.classList.add('downarea-toolbar');
        wrapper.appendChild(toolbar);
        if (this.hiddenTools.indexOf('heading') < 0) {
            var headingTool = document.createElement('div');
            headingTool.classList.add('downarea-toolbar-tool');
            headingTool.dataset.dropdown = 'heading-dropdown';
            headingTool.title = 'Heading';
            headingTool.innerText = 'Heading';
            toolbar.appendChild(headingTool);
            var headingDropdown = document.createElement('div');
            headingDropdown.classList.add('downarea-tool-dropdown');
            headingDropdown.id = 'heading-dropdown';
            headingDropdown.innerHTML = "<ul class=\"heading-list\">\n                            <li data-action=\"heading-1\">Heading 1</li>\n                            <li data-action=\"heading-2\">Heading 2</li>\n                            <li data-action=\"heading-3\">Heading 3</li>\n                            <li data-action=\"heading-4\">Heading 4</li>\n                            <li data-action=\"heading-5\">Heading 5</li>\n                            <li data-action=\"heading-6\">Heading 6</li>\n                        </ul>";
            headingTool.appendChild(headingDropdown);
        }
        if (this.hiddenTools.indexOf('bold') < 0) {
            var boldTool = document.createElement('div');
            boldTool.classList.add('downarea-toolbar-tool');
            boldTool.dataset.action = 'bold';
            boldTool.title = 'Bold';
            boldTool.innerHTML = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" version=\"1.1\"\n                         style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\">\n                        <g transform=\"matrix(136.803,0,0,136.803,1.50441,98.8296)\">\n                            <path d=\"M0.09,-0.714L0.312,-0.714C0.413,-0.714 0.487,-0.699 0.532,-0.671C0.578,-0.642 0.601,-0.596 0.601,-0.533C0.601,-0.491 0.591,-0.456 0.571,-0.428C0.551,-0.401 0.524,-0.384 0.491,-0.379L0.491,-0.374C0.536,-0.364 0.569,-0.345 0.589,-0.317C0.609,-0.29 0.619,-0.253 0.619,-0.207C0.619,-0.142 0.596,-0.091 0.549,-0.055C0.502,-0.018 0.438,-0 0.357,-0L0.09,-0L0.09,-0.714ZM0.241,-0.431L0.329,-0.431C0.37,-0.431 0.4,-0.438 0.418,-0.45C0.437,-0.463 0.446,-0.484 0.446,-0.513C0.446,-0.541 0.436,-0.56 0.416,-0.572C0.396,-0.584 0.364,-0.59 0.321,-0.59L0.241,-0.59L0.241,-0.431ZM0.241,-0.311L0.241,-0.125L0.34,-0.125C0.382,-0.125 0.412,-0.133 0.432,-0.149C0.452,-0.165 0.462,-0.189 0.462,-0.222C0.462,-0.281 0.42,-0.311 0.335,-0.311L0.241,-0.311Z\"\n                                  style=\"fill-rule:nonzero;\"/>\n                        </g>\n                    </svg>";
            toolbar.appendChild(boldTool);
        }
        if (this.hiddenTools.indexOf('italic') < 0) {
            var italicTool = document.createElement('div');
            italicTool.classList.add('downarea-toolbar-tool');
            italicTool.dataset.action = 'italic';
            italicTool.title = 'Italic';
            italicTool.innerHTML = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" version=\"1.1\"\n                         style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\">\n                        <g transform=\"matrix(134.024,0,0,134.024,9.52436,97.6415)\">\n                            <path d=\"M0.164,-0.711L0.155,-0.658L0.322,-0.658L0.217,-0.052L0.049,-0.052L0.041,-0L0.44,-0L0.449,-0.052L0.276,-0.052L0.382,-0.658L0.555,-0.658L0.563,-0.711L0.164,-0.711Z\"\n                                  style=\"fill-rule:nonzero;\"/>\n                        </g>\n                    </svg>";
            toolbar.appendChild(italicTool);
        }
        if (this.hiddenTools.indexOf('bold-italic') < 0) {
            var boldItalicTool = document.createElement('div');
            boldItalicTool.classList.add('downarea-toolbar-tool');
            boldItalicTool.dataset.action = 'bold-italic';
            boldItalicTool.title = 'Bold Italic';
            boldItalicTool.innerHTML = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" version=\"1.1\"\n                         style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\">\n                        <g transform=\"matrix(0.615437,0,0,0.615437,0.160959,18.9966)\">\n                            <g transform=\"matrix(139.605,0,0,139.605,0,100)\">\n                                <path d=\"M0.01,-0L0.269,-0C0.303,0 0.336,-0.003 0.368,-0.011C0.4,-0.019 0.429,-0.032 0.454,-0.049C0.478,-0.067 0.499,-0.089 0.515,-0.116C0.531,-0.143 0.54,-0.175 0.542,-0.212C0.543,-0.229 0.542,-0.245 0.54,-0.26C0.537,-0.276 0.532,-0.291 0.524,-0.304C0.517,-0.318 0.508,-0.329 0.496,-0.34C0.485,-0.35 0.471,-0.358 0.455,-0.364C0.472,-0.371 0.488,-0.38 0.503,-0.39C0.517,-0.4 0.531,-0.411 0.542,-0.424C0.553,-0.437 0.562,-0.451 0.569,-0.467C0.576,-0.483 0.58,-0.501 0.582,-0.521C0.584,-0.555 0.58,-0.584 0.568,-0.607C0.556,-0.631 0.54,-0.651 0.519,-0.666C0.497,-0.681 0.473,-0.692 0.445,-0.699C0.417,-0.706 0.388,-0.71 0.358,-0.71L0.133,-0.711L0.01,-0ZM0.199,-0.313L0.329,-0.313C0.345,-0.312 0.359,-0.309 0.37,-0.304C0.382,-0.299 0.391,-0.292 0.397,-0.283C0.404,-0.275 0.408,-0.265 0.41,-0.253C0.412,-0.241 0.412,-0.228 0.41,-0.213C0.408,-0.196 0.402,-0.181 0.394,-0.168C0.386,-0.155 0.376,-0.145 0.364,-0.136C0.351,-0.127 0.338,-0.121 0.323,-0.117C0.307,-0.112 0.292,-0.11 0.275,-0.11L0.164,-0.111L0.199,-0.313ZM0.216,-0.413L0.249,-0.599L0.353,-0.599C0.368,-0.598 0.381,-0.596 0.394,-0.593C0.406,-0.59 0.416,-0.584 0.425,-0.578C0.433,-0.57 0.439,-0.561 0.443,-0.55C0.447,-0.539 0.448,-0.525 0.446,-0.509C0.443,-0.491 0.438,-0.476 0.429,-0.464C0.421,-0.452 0.41,-0.442 0.398,-0.434C0.385,-0.426 0.371,-0.421 0.356,-0.417C0.341,-0.413 0.325,-0.412 0.309,-0.412L0.216,-0.413Z\"\n                                      style=\"fill-rule:nonzero;\"/>\n                            </g>\n                            <g transform=\"matrix(139.605,0,0,139.605,81.9359,100)\">\n                                <path d=\"M0.164,-0.711L0.144,-0.6L0.275,-0.6L0.19,-0.11L0.06,-0.11L0.04,-0L0.44,-0L0.459,-0.11L0.325,-0.11L0.41,-0.6L0.544,-0.6L0.563,-0.711L0.164,-0.711Z\"\n                                      style=\"fill-rule:nonzero;\"/>\n                            </g>\n                        </g>\n                    </svg>";
            toolbar.appendChild(boldItalicTool);
        }
        if (this.hiddenTools.indexOf('link') < 0) {
            var linkTool = document.createElement('div');
            linkTool.classList.add('downarea-toolbar-tool');
            linkTool.dataset.dropdown = 'link-dropdown';
            linkTool.title = 'Link';
            linkTool.innerHTML = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" version=\"1.1\"\n                         style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\">\n                        <g transform=\"matrix(1.47599,0,0,1.47599,-23.9251,-18.9625)\">\n                            <path d=\"M52.418,62.171L40.033,74.556C35.126,79.463 27.159,79.463 22.252,74.556C17.345,69.649 17.345,61.681 22.252,56.775C22.252,56.775 40.637,38.39 40.637,38.39C45.544,33.483 53.511,33.483 58.418,38.39C59.49,39.461 60.327,40.679 60.931,41.979L57.342,45.568C57.027,44.122 56.308,42.747 55.184,41.624C52.062,38.501 46.993,38.501 43.871,41.624L25.486,60.008C22.364,63.13 22.364,68.2 25.486,71.322C28.608,74.444 33.677,74.444 36.8,71.322L46.395,61.727C48.361,62.251 50.406,62.399 52.418,62.171ZM47.827,31.199L60.137,18.89C65.044,13.983 73.011,13.983 77.918,18.89C82.825,23.797 82.825,31.764 77.918,36.671C77.918,36.671 59.533,55.056 59.533,55.056C54.626,59.963 46.659,59.963 41.752,55.056C40.658,53.962 39.808,52.715 39.201,51.384L42.807,47.778C43.111,49.26 43.837,50.673 44.986,51.822C48.108,54.944 53.177,54.944 56.3,51.822L74.684,33.437C77.806,30.315 77.806,25.246 74.684,22.124C71.562,19.001 66.493,19.001 63.371,22.124L53.81,31.684C51.859,31.151 49.827,30.989 47.827,31.199Z\"/>\n                        </g>\n                    </svg>";
            toolbar.appendChild(linkTool);
            var linkDropdown = document.createElement('div');
            linkDropdown.classList.add('downarea-tool-dropdown');
            linkDropdown.id = 'link-dropdown';
            linkDropdown.innerHTML = "<ul>\n                            <li data-action=\"normal-link\">Normal</li>\n                            <li data-action=\"quick-link\">Quick</li>\n                            <li data-action=\"email\">Email</li>\n                        </ul>";
            linkTool.appendChild(linkDropdown);
        }
        if (this.hiddenTools.indexOf('image') < 0) {
            var imageTool = document.createElement('div');
            imageTool.classList.add('downarea-toolbar-tool');
            imageTool.dataset.action = 'image';
            imageTool.title = 'Image';
            imageTool.innerHTML = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" version=\"1.1\"\n                         style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\">\n                        <g transform=\"matrix(1.19512,0,0,1.19512,-9.7561,-9.7561)\">\n                            <path d=\"M91,9L91,91L9,91L9,9L91,9ZM85,77.5L85,15L15,15L15,77.5L40.5,52L59,70.5L68.5,61L85,77.5ZM65,24C71.623,24 77,29.377 77,36C77,42.623 71.623,48 65,48C58.377,48 53,42.623 53,36C53,29.377 58.377,24 65,24Z\"/>\n                        </g>\n                    </svg>";
            toolbar.appendChild(imageTool);
        }
        if (this.hiddenTools.indexOf('blockquote') < 0) {
            var blockquoteTool = document.createElement('div');
            blockquoteTool.classList.add('downarea-toolbar-tool');
            blockquoteTool.dataset.action = 'blockquote';
            blockquoteTool.title = 'Blockquote';
            blockquoteTool.innerHTML = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" version=\"1.1\"\n                         style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\">\n                        <g transform=\"matrix(12.2983,0,0,12.2983,-441.858,-474.216)\">\n                            <g transform=\"matrix(36,0,0,36,34,64)\">\n                                <path d=\"M0.098,-0.609L0.059,-0.609L0.059,-0.695L0.148,-0.695L0.148,-0.609L0.098,-0.492L0.059,-0.492L0.098,-0.609Z\"\n                                      style=\"fill-rule:nonzero;\"/>\n                            </g>\n                            <g transform=\"matrix(36,0,0,36,38.5347,64)\">\n                                <path d=\"M0.098,-0.609L0.059,-0.609L0.059,-0.695L0.148,-0.695L0.148,-0.609L0.098,-0.492L0.059,-0.492L0.098,-0.609Z\"\n                                      style=\"fill-rule:nonzero;\"/>\n                            </g>\n                        </g>\n                    </svg>";
            toolbar.appendChild(blockquoteTool);
        }
        if (this.hiddenTools.indexOf('u-list') < 0) {
            var unorderedListTool = document.createElement('div');
            unorderedListTool.classList.add('downarea-toolbar-tool');
            unorderedListTool.dataset.action = 'u-list';
            unorderedListTool.title = 'Unordered List';
            unorderedListTool.innerHTML = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" version=\"1.1\"\n                         style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\">\n                        <g transform=\"matrix(1.33803,0,0,1.33803,-16.2324,-22.2535)\">\n                            <path d=\"M28,70L14,70L14,84L28,84L28,70ZM85,73L36,73L36,81L85,81L85,73ZM28,47L14,47L14,61L28,61L28,47ZM85,50L36,50L36,58L85,58L85,50ZM28,24L14,24L14,38L28,38L28,24ZM85,27L36,27L36,35L85,35L85,27Z\"/>\n                        </g>\n                    </svg>";
            toolbar.appendChild(unorderedListTool);
        }
        if (this.hiddenTools.indexOf('o-list') < 0) {
            var orderedListTool = document.createElement('div');
            orderedListTool.classList.add('downarea-toolbar-tool');
            orderedListTool.dataset.action = 'o-list';
            orderedListTool.title = 'Ordered List';
            orderedListTool.innerHTML = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" version=\"1.1\"\n                         style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\">\n                        <g transform=\"matrix(1.35654,0,0,1.35654,-19.6483,-27.7952)\">\n                            <path d=\"M22.603,81.499L22.603,84.525L24.719,84.525C25.251,84.525 25.73,84.586 26.155,84.707C26.58,84.829 26.947,85.016 27.255,85.268C27.554,85.52 27.783,85.842 27.941,86.235C28.1,86.627 28.18,87.099 28.18,87.65C28.18,88.089 28.112,88.486 27.976,88.841C27.841,89.196 27.643,89.494 27.381,89.737C27.11,90.008 26.774,90.214 26.372,90.354C25.971,90.494 25.518,90.564 25.013,90.564C24.565,90.564 24.154,90.496 23.78,90.361C23.407,90.225 23.084,90.036 22.813,89.793C22.533,89.56 22.318,89.277 22.169,88.946C22.02,88.614 21.945,88.252 21.945,87.86L18.05,87.86C18.05,88.85 18.244,89.709 18.631,90.438C19.019,91.166 19.535,91.769 20.179,92.245C20.824,92.731 21.56,93.093 22.386,93.331C23.213,93.569 24.06,93.688 24.929,93.688C25.938,93.688 26.879,93.555 27.752,93.289C28.626,93.023 29.38,92.633 30.015,92.119C30.65,91.615 31.15,90.989 31.514,90.242C31.878,89.494 32.061,88.645 32.061,87.692C32.061,87.15 31.995,86.636 31.864,86.151C31.734,85.665 31.533,85.217 31.262,84.806C30.991,84.404 30.648,84.044 30.232,83.727C29.817,83.409 29.324,83.148 28.754,82.942C29.24,82.709 29.669,82.431 30.043,82.108C30.417,81.786 30.73,81.434 30.982,81.051C31.234,80.668 31.425,80.264 31.556,79.839C31.687,79.414 31.752,78.982 31.752,78.543C31.752,77.59 31.587,76.752 31.255,76.028C30.923,75.304 30.459,74.694 29.861,74.199C29.263,73.714 28.544,73.347 27.703,73.1C26.863,72.852 25.938,72.728 24.929,72.728C23.995,72.728 23.124,72.864 22.316,73.135C21.508,73.405 20.805,73.784 20.207,74.269C19.61,74.765 19.14,75.353 18.799,76.035C18.458,76.717 18.288,77.473 18.288,78.305L22.183,78.305C22.183,77.931 22.258,77.595 22.407,77.296C22.557,76.997 22.762,76.74 23.024,76.525C23.276,76.32 23.572,76.161 23.913,76.049C24.254,75.937 24.621,75.881 25.013,75.881C25.49,75.881 25.908,75.946 26.267,76.077C26.627,76.208 26.923,76.39 27.157,76.623C27.39,76.866 27.565,77.153 27.682,77.485C27.799,77.817 27.857,78.183 27.857,78.585C27.857,78.996 27.799,79.376 27.682,79.727C27.565,80.077 27.39,80.373 27.157,80.616C26.905,80.897 26.575,81.114 26.169,81.268C25.763,81.422 25.279,81.499 24.719,81.499L22.603,81.499ZM85,80L36,80L36,86L85,86L85,80ZM32.019,67.408L32.019,64.284L23.066,64.284L26.905,60.221C27.568,59.539 28.17,58.887 28.712,58.266C29.254,57.645 29.721,57.036 30.113,56.438C30.496,55.84 30.793,55.235 31.003,54.623C31.213,54.012 31.318,53.369 31.318,52.697C31.318,51.81 31.178,50.999 30.898,50.266C30.617,49.533 30.211,48.905 29.679,48.382C29.137,47.858 28.467,47.452 27.668,47.163C26.87,46.873 25.952,46.728 24.915,46.728C23.832,46.728 22.844,46.903 21.952,47.254C21.06,47.604 20.301,48.083 19.675,48.69C19.04,49.297 18.55,50.004 18.204,50.812C17.858,51.62 17.686,52.477 17.686,53.383L21.595,53.383C21.595,52.832 21.665,52.342 21.805,51.912C21.945,51.483 22.15,51.123 22.421,50.833C22.683,50.553 23.012,50.341 23.409,50.196C23.806,50.051 24.266,49.979 24.789,49.979C25.191,49.979 25.557,50.044 25.889,50.175C26.22,50.306 26.508,50.493 26.751,50.735C26.984,50.988 27.166,51.291 27.297,51.646C27.428,52.001 27.493,52.407 27.493,52.865C27.493,53.173 27.444,53.491 27.346,53.818C27.248,54.145 27.091,54.495 26.877,54.869C26.652,55.251 26.363,55.672 26.008,56.13C25.653,56.587 25.219,57.096 24.705,57.657L18.106,64.746L18.106,67.408L32.019,67.408ZM85,54L36,54L36,60L85,60L85,54ZM28.222,41.408L28.222,21.008L28.011,21.008L19.129,24.217L19.129,27.608L24.285,25.758L24.285,41.408L28.222,41.408ZM85,28L36,28L36,34L85,34L85,28Z\"\n                                  style=\"fill-rule:nonzero;\"/>\n                        </g>\n                    </svg>";
            toolbar.appendChild(orderedListTool);
        }
        if (this.hiddenTools.indexOf('sl-code') < 0) {
            var singleLineCodeTool = document.createElement('div');
            singleLineCodeTool.classList.add('downarea-toolbar-tool');
            singleLineCodeTool.dataset.action = 'sl-code';
            singleLineCodeTool.title = 'Single Line Code';
            singleLineCodeTool.innerHTML = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" version=\"1.1\"\n                         style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\">\n                        <path d=\"M1.526,41.389L14.16,41.389L19.016,56.007L15.466,56.007L1.526,41.389ZM80.526,41.389L93.16,41.389L98.016,56.007L94.466,56.007L80.526,41.389ZM75.763,44.392L24.237,44.392L24.237,53.003L75.763,53.003L75.763,44.392Z\"\n                              style=\"fill-rule:nonzero;\"/>\n                    </svg>";
            toolbar.appendChild(singleLineCodeTool);
        }
        if (this.hiddenTools.indexOf('code-block') < 0) {
            var codeBlockTool = document.createElement('div');
            codeBlockTool.classList.add('downarea-toolbar-tool');
            codeBlockTool.dataset.action = 'code-block';
            codeBlockTool.title = 'Code Block';
            codeBlockTool.innerHTML = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" version=\"1.1\"\n                         style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\">\n                        <g transform=\"matrix(1.47619,0,0,1.37619,-9.78571,-21.5619)\">\n                            <path d=\"M29.5,65L9,65L9,72L29.5,72L29.5,65ZM61,54L9,54L9,61L61,61L61,54ZM50,43L9,43L9,50L50,50L50,43ZM72,32L9,32L9,39L72,39L72,32Z\"/>\n                        </g>\n                    </svg>";
            toolbar.appendChild(codeBlockTool);
        }
        var textareaContainer = document.createElement('div');
        textareaContainer.classList.add('downarea-textarea');
        wrapper.appendChild(textareaContainer);
        var textarea = (_a = this.textarea) !== null && _a !== void 0 ? _a : document.createElement('textarea');
        if (this.textareaName) {
            textarea.name = this.textareaName;
        }
        textarea.value = this.textareaValue.toString();
        textareaContainer.appendChild(textarea);
        var bottom = document.createElement('div');
        bottom.classList.add('downarea-bottom');
        wrapper.appendChild(bottom);
    };
    DownArea.prototype.registerElements = function () {
        this.downareaElement = this.element.querySelector('.downarea');
        this.resizer = this.downareaElement.querySelector('.resizer');
        this.toolbar = this.downareaElement.querySelector('.downarea-toolbar');
        this.textarea = this.downareaElement.querySelector('.downarea-textarea textarea');
    };
    DownArea.prototype.listenTextareaEvents = function () {
        var self = this;
        this.textarea.addEventListener('focusin', function () {
            self.downareaElement.classList.add('focused');
        });
        this.textarea.addEventListener('focusout', function () {
            self.downareaElement.classList.remove('focused');
        });
        this.textarea.addEventListener('keydown', function (e) {
            if (e.key.toLowerCase() === 'enter' && DownArea.onListing !== null) {
                e.preventDefault();
                var start = self.textarea.value.substr(0, self.textarea.selectionStart);
                var end = self.textarea.value.substr(self.textarea.selectionStart);
                var splittedStart = start.split(/\n/g);
                var list = '';
                var pattern = DownArea.onListing.type === 'unordered' ? /-\s?/ : /\d+\.\s?/;
                if (splittedStart.length) {
                    var match = splittedStart[splittedStart.length - 1].trim().match(pattern);
                    if (match && match[0] === match.input) {
                        splittedStart.pop();
                        self.textarea.value = splittedStart.join('\n') + "\n" + end;
                        self.textarea.selectionStart = splittedStart.join('\n').length + '\n'.length;
                        self.textarea.selectionEnd = self.textarea.selectionStart;
                        return DownArea.onListing = null;
                    }
                }
                if (DownArea.onListing.type === 'unordered') {
                    list = "\n- ";
                }
                if (DownArea.onListing.type === 'ordered') {
                    list = "\n" + DownArea.onListing.number + ". ";
                    DownArea.onListing.number++;
                }
                self.textarea.value = "" + start + list + end;
                self.textarea.selectionStart = start.length + list.length;
                self.textarea.selectionEnd = self.textarea.selectionStart;
                self.textarea.focus();
            }
            if (e.key.toLowerCase() === 'tab') {
                e.preventDefault();
                if (e.shiftKey) {
                    self.shiftTab(self);
                }
                else {
                    self.addTab(self);
                }
            }
        });
    };
    DownArea.prototype.setTextareaSize = function () {
        var downareaRect = this.downareaElement.getBoundingClientRect();
        var toolbarRect = this.toolbar.getBoundingClientRect();
        var bottomRect = this.downareaElement.querySelector('.downarea-bottom').getBoundingClientRect();
        this.textarea.style.height = downareaRect.height - toolbarRect.height - bottomRect.height + 'px';
    };
    DownArea.prototype.initResizer = function () {
        var _this = this;
        if (this.resize == DownArea.RESIZE_OFF) {
            this.resizer.remove();
        }
        else if (this.resize == DownArea.RESIZE_VERTICAL) {
            this.resizer.classList.add('vertical');
        }
        else if (this.resize == DownArea.RESIZE_HORIZONTAL) {
            this.resizer.classList.add('horizontal');
        }
        else if (this.resize == DownArea.RESIZE_BOTH) {
            this.resizer.classList.add('both');
        }
        var isResizing = false;
        var self = this;
        var mousedown = function (e) {
            e.preventDefault();
            var rect = self.downareaElement.getBoundingClientRect();
            if (rect.width <= self.minWidth) {
                self.downareaElement.style.width = self.minWidth + 0.1 + 'px';
            }
            if (rect.height <= self.minHeight) {
                self.downareaElement.style.height = self.minHeight + 0.1 + 'px';
            }
            isResizing = true;
            var prevX = e.clientX;
            var prevY = e.clientY;
            var mousemove = function (e) {
                var rect = self.downareaElement.getBoundingClientRect();
                if (rect.width <= self.minWidth) {
                    self.downareaElement.style.width = self.minWidth + 0.1 + 'px';
                }
                if (rect.height <= self.minHeight) {
                    self.downareaElement.style.height = self.minHeight + 0.1 + 'px';
                }
                if (self.resizer.classList.contains('vertical')) {
                    if (rect.height > self.minHeight) {
                        self.downareaElement.style.height = rect.height - (prevY - e.clientY) + 'px';
                    }
                }
                else if (self.resizer.classList.contains('horizontal')) {
                    if (rect.width > self.minWidth) {
                        self.downareaElement.style.width = rect.width - (prevX - e.clientX) + 'px';
                    }
                }
                else if (self.resizer.classList.contains('both')) {
                    if (rect.width > self.minWidth) {
                        self.downareaElement.style.width = rect.width - (prevX - e.clientX) + 'px';
                    }
                    if (rect.height > self.minHeight) {
                        self.downareaElement.style.height = rect.height - (prevY - e.clientY) + 'px';
                    }
                }
                prevX = e.clientX;
                prevY = e.clientY;
                _this.setTextareaSize();
            };
            var mouseup = function () {
                removeEventListener('mousemove', mousemove);
                removeEventListener('mouseup', mouseup);
                isResizing = false;
            };
            addEventListener('mousemove', mousemove);
            addEventListener('mouseup', mouseup);
        };
        this.resizer.addEventListener('mousedown', mousedown);
    };
    DownArea.prototype.listenTools = function () {
        this.addTools();
        var self = this;
        this.tools.map(function (tool) {
            tool.addEventListener('click', function () {
                var _a;
                var action = (_a = self.actions[tool.dataset.action]) !== null && _a !== void 0 ? _a : null;
                if (action) {
                    if (action.args) {
                        action.fn.apply(action, __spreadArray([self], action.args));
                    }
                    else {
                        action.fn(self);
                    }
                }
            });
        });
    };
    DownArea.prototype.addTools = function () {
        var _this = this;
        var tools = this.downareaElement.querySelectorAll('div.downarea-toolbar *');
        tools.forEach(function (tool) {
            if (tool.dataset.action) {
                _this.tools.push(tool);
            }
        });
    };
    DownArea.prototype.initDropdowns = function () {
        var tools = this.downareaElement.querySelectorAll('.downarea-toolbar .downarea-toolbar-tool');
        tools.forEach(function (tool) {
            if (tool.dataset.dropdown) {
                var dropdown_1 = tool.querySelector('#' + tool.dataset.dropdown);
                tool.addEventListener('click', function () {
                    if (dropdown_1.classList.contains('active')) {
                        dropdown_1.classList.remove('active');
                    }
                    else {
                        dropdown_1.classList.add('active');
                    }
                });
            }
        });
    };
    DownArea.prototype.addTab = function (self) {
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        var tab = "\t";
        self.textarea.value = "" + start + tab + end;
        self.textarea.selectionStart = start.length + tab.length;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
    };
    DownArea.prototype.shiftTab = function (self) {
        var _a;
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        if (start[start.length - 1] == '\t') {
            start = (_a = start.substr(0, start.length - 1)) !== null && _a !== void 0 ? _a : '';
        }
        else if (end[0] == '\t') {
            end = end.substr(1);
        }
        self.textarea.value = "" + start + end;
        self.textarea.selectionStart = start.length;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
    };
    DownArea.prototype.addHeading = function (self, level) {
        if (level === void 0) { level = 1; }
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        var heading = repeat('#', level) + " ";
        var offset = 0;
        if (self.textarea.selectionStart != self.textarea.selectionEnd) {
            end = self.textarea.value.substr(self.textarea.selectionEnd);
            var range = self.textarea.value.slice(self.textarea.selectionStart, self.textarea.selectionEnd);
            heading = "" + heading + range.trim();
            offset = 0;
        }
        if (start.length && start[start.length - 1] != '\n') {
            heading = "\n" + heading;
        }
        if (end.length && end[0] != '\n') {
            heading = heading + "\n";
            offset = 1;
        }
        self.textarea.value = "" + start + heading + end;
        self.textarea.selectionStart = start.length + heading.length - offset;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
    };
    DownArea.prototype.addBold = function (self) {
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        var bold = "****";
        var offset = bold.length - 2;
        if (self.textarea.selectionStart != self.textarea.selectionEnd) {
            end = self.textarea.value.substr(self.textarea.selectionEnd);
            var range = self.textarea.value.slice(self.textarea.selectionStart, self.textarea.selectionEnd);
            bold = "**" + range + "**";
            offset = 2;
        }
        if (start.length && start[start.length - 1] != '\n' && start[start.length - 1] != ' ') {
            bold = " " + bold;
        }
        if (end.length && end[0] != '\n' && end[0] != ' ') {
            bold = bold + " ";
            offset += 1;
        }
        self.textarea.value = "" + start + bold + end;
        self.textarea.selectionStart = start.length + bold.length - offset;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
    };
    DownArea.prototype.addItalic = function (self) {
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        var bold = "**";
        var offset = bold.length - 1;
        if (self.textarea.selectionStart != self.textarea.selectionEnd) {
            end = self.textarea.value.substr(self.textarea.selectionEnd);
            var range = self.textarea.value.slice(self.textarea.selectionStart, self.textarea.selectionEnd);
            bold = "*" + range + "*";
            offset = 1;
        }
        if (start.length && start[start.length - 1] != '\n' && start[start.length - 1] != ' ') {
            bold = " " + bold;
        }
        if (end.length && end[0] != '\n' && end[0] != ' ') {
            bold = bold + " ";
            offset += 1;
        }
        self.textarea.value = "" + start + bold + end;
        self.textarea.selectionStart = start.length + bold.length - offset;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
    };
    DownArea.prototype.addBoldItalic = function (self) {
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        var bold = "******";
        var offset = bold.length - 3;
        if (self.textarea.selectionStart != self.textarea.selectionEnd) {
            end = self.textarea.value.substr(self.textarea.selectionEnd);
            var range = self.textarea.value.slice(self.textarea.selectionStart, self.textarea.selectionEnd);
            bold = "***" + range + "***";
            offset = 3;
        }
        if (start.length && start[start.length - 1] != '\n' && start[start.length - 1] != ' ') {
            bold = " " + bold;
        }
        if (end.length && end[0] != '\n' && end[0] != ' ') {
            bold = bold + " ";
            offset += 1;
        }
        self.textarea.value = "" + start + bold + end;
        self.textarea.selectionStart = start.length + bold.length - offset;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
    };
    DownArea.prototype.addLink = function (self, type) {
        if (type === void 0) { type = 0; }
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        var link = '';
        var offset = 0;
        if (type === 0) {
            link = '[](http://)';
            offset = link.length - 1;
            if (self.textarea.selectionStart != self.textarea.selectionEnd) {
                end = self.textarea.value.substr(self.textarea.selectionEnd);
                var range = self.textarea.value.slice(self.textarea.selectionStart, self.textarea.selectionEnd);
                var rangeIsURL = range.match(/https?:\/\/(.+)/);
                link = rangeIsURL ? "[](" + range.trim() + ")" : "[" + range.trim() + "](http://)";
                offset = rangeIsURL ? range.trim().length + 3 : 1;
            }
        }
        else {
            link = '<>';
            offset = link.length - 1;
            if (self.textarea.selectionStart != self.textarea.selectionEnd) {
                end = self.textarea.value.substr(self.textarea.selectionEnd);
                var range = self.textarea.value.slice(self.textarea.selectionStart, self.textarea.selectionEnd);
                link = "<" + range + ">";
                offset = 1;
            }
        }
        if (start.length && start[start.length - 1] != '\n' && start[start.length - 1] != ' ') {
            link = " " + link;
        }
        if (end.length && end[0] != '\n' && end[0] != ' ') {
            link = link + " ";
            offset += 1;
        }
        self.textarea.value = "" + start + link + end;
        self.textarea.selectionStart = start.length + link.length - offset;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
    };
    DownArea.prototype.addEmail = function (self) {
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        var emailLink = '<@>';
        var offset = emailLink.length - 1;
        if (self.textarea.selectionStart != self.textarea.selectionEnd) {
            end = self.textarea.value.substr(self.textarea.selectionEnd);
            var range = self.textarea.value.slice(self.textarea.selectionStart, self.textarea.selectionEnd);
            emailLink = "<" + range + ">";
            offset = 1;
        }
        if (start.length && start[start.length - 1] != '\n' && start[start.length - 1] != ' ') {
            emailLink = " " + emailLink;
        }
        if (end.length && end[0] != '\n' && end[0] != ' ') {
            emailLink = emailLink + " ";
            offset += 1;
        }
        self.textarea.value = "" + start + emailLink + end;
        self.textarea.selectionStart = start.length + emailLink.length - offset;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
    };
    DownArea.prototype.addImage = function (self) {
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        var link = "![](http://)";
        var offset = link.length - 2;
        if (self.textarea.selectionStart != self.textarea.selectionEnd) {
            end = self.textarea.value.substr(self.textarea.selectionEnd);
            var range = self.textarea.value.slice(self.textarea.selectionStart, self.textarea.selectionEnd);
            var rangeIsURL = range.match(/https?:\/\/(.+)/);
            link = rangeIsURL ? "![](" + range.trim() + ")" : "![" + range.trim() + "](http://)";
            offset = rangeIsURL ? range.trim().length + 3 : 1;
        }
        if (start.length && start[start.length - 1] != '\n' && start[start.length - 1] != ' ') {
            link = " " + link;
        }
        if (end.length && end[0] != '\n' && end[0] != ' ') {
            link = link + " ";
            offset += 1;
        }
        self.textarea.value = "" + start + link + end;
        self.textarea.selectionStart = start.length + link.length - offset;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
    };
    DownArea.prototype.addBlockquote = function (self) {
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        var blockquote = "> ";
        var offset = 0;
        if (self.textarea.selectionStart != self.textarea.selectionEnd) {
            end = self.textarea.value.substr(self.textarea.selectionEnd);
            var range = self.textarea.value.slice(self.textarea.selectionStart, self.textarea.selectionEnd);
            blockquote = "" + blockquote + range.trim();
        }
        if (start.length && start[start.length - 1] != '\n') {
            blockquote = "\n" + blockquote;
        }
        if (end.length && end[0] != '\n') {
            blockquote = blockquote + "\n";
            offset = 1;
        }
        self.textarea.value = "" + start + blockquote + end;
        self.textarea.selectionStart = start.length + blockquote.length - offset;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
    };
    DownArea.prototype.addUnorderedList = function (self) {
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        var list = "- ";
        var offset = 0;
        if (self.textarea.selectionStart != self.textarea.selectionEnd) {
            end = self.textarea.value.substr(self.textarea.selectionEnd);
            var range = self.textarea.value.slice(self.textarea.selectionStart, self.textarea.selectionEnd);
            list = "" + list + range.trim();
        }
        if (start.length && start[start.length - 1] != '\n') {
            list = "\n" + list;
        }
        if (end.length && end[0] != '\n') {
            list = list + "\n";
            offset = 1;
        }
        self.textarea.value = "" + start + list + end;
        self.textarea.selectionStart = start.length + list.length - offset;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
        DownArea.onListing = {
            type: 'unordered'
        };
    };
    DownArea.prototype.addOrderedList = function (self) {
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        var list = "1. ";
        var offset = 0;
        if (self.textarea.selectionStart != self.textarea.selectionEnd) {
            end = self.textarea.value.substr(self.textarea.selectionEnd);
            var range = self.textarea.value.slice(self.textarea.selectionStart, self.textarea.selectionEnd);
            list = "" + list + range.trim();
        }
        if (start.length && start[start.length - 1] != '\n') {
            list = "\n" + list;
        }
        if (end.length && end[0] != '\n') {
            list = list + "\n";
            offset = 1;
        }
        self.textarea.value = "" + start + list + end;
        self.textarea.selectionStart = start.length + list.length - offset;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
        DownArea.onListing = {
            type: 'ordered',
            number: 2,
        };
    };
    DownArea.prototype.addSingleLineCode = function (self) {
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        var code = '``';
        var offset = 1;
        if (self.textarea.selectionStart != self.textarea.selectionEnd) {
            end = self.textarea.value.substr(self.textarea.selectionEnd);
            var range = self.textarea.value.slice(self.textarea.selectionStart, self.textarea.selectionEnd);
            code = "`" + range + "`";
        }
        if (start.length && start[start.length - 1] != '\n') {
            code = " " + code;
        }
        if (end.length && end[0] != '\n') {
            code = code + " ";
            offset += 1;
        }
        self.textarea.value = "" + start + code + end;
        self.textarea.selectionStart = start.length + code.length - offset;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
    };
    DownArea.prototype.addCodeBlock = function (self) {
        var start = self.textarea.value.substr(0, self.textarea.selectionStart);
        var end = self.textarea.value.substr(self.textarea.selectionStart);
        var code = '```\n```';
        var offset = 4;
        if (self.textarea.selectionStart != self.textarea.selectionEnd) {
            end = self.textarea.value.substr(self.textarea.selectionEnd);
            var range = self.textarea.value.slice(self.textarea.selectionStart, self.textarea.selectionEnd);
            code = "```\n" + range + "\n```";
            offset = range.length + 5;
        }
        if (start.length && start[start.length - 1] != '\n') {
            code = "\n" + code;
        }
        if (end.length && end[0] != '\n') {
            code = code + " ";
            offset += 1;
        }
        self.textarea.value = "" + start + code + end;
        self.textarea.selectionStart = start.length + code.length - offset;
        self.textarea.selectionEnd = self.textarea.selectionStart;
        self.textarea.focus();
    };
    DownArea.RESIZE_OFF = 0;
    DownArea.RESIZE_VERTICAL = 1;
    DownArea.RESIZE_HORIZONTAL = 2;
    DownArea.RESIZE_BOTH = 3;
    DownArea.onListing = null;
    return DownArea;
}());
