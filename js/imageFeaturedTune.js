class imageFeaturedTune {
    constructor({api, data, config, block}) {
        this.api = api;
        this.block = block;
        this.data = data;
    }

    as_featured = false;
    as_featured_time = 0;

    render() {
        var current_block = this.api.blocks.getBlockByIndex(this.api.blocks.getCurrentBlockIndex());

        var current_block_display = current_block.holder.querySelector(".as_featured_wrapper svg").style.display;
        if (current_block_display == 'none' && this.as_featured) {
            this.as_featured = false;
        }

        return {
            icon: this.getIcon(false),
            label: 'As featured image',
            toggle: 'as_featured',
            onActivate: () => {
                var as_featured_wrappers = document.querySelectorAll(".as_featured_wrapper svg");
                for (var i = 0; i < as_featured_wrappers.length; i++) {
                    var as_featured_wrapper = as_featured_wrappers[i];
                    as_featured_wrapper.style.display = "none";
                }

                if (this.as_featured) {
                    this.as_featured = false;
                    current_block.holder.querySelector(".as_featured_wrapper svg").style.display = "none";
                } else {
                    this.as_featured = true;
                    this.as_featured_time = Math.round(Date.now() / 1000);
                    current_block.holder.querySelector(".as_featured_wrapper svg").style.display = "inline";
                }
            },
            isActive: this.as_featured,
            closeOnActivate: true
        };

    }


    save() {
        try {
            var current_block = this.api.blocks.getBlockByIndex(this.api.blocks.getCurrentBlockIndex());
            var current_block_display = current_block.holder.querySelector(".as_featured_wrapper svg").style.display;
            if (current_block_display == 'none' && this.as_featured) {
                this.as_featured = false;
            }
        } catch (e) {

        }
        return {
            as_featured: this.as_featured,
            as_featured_time: this.as_featured_time,
        };
    }

    wrap(blockContent) {
        const wrapper = document.createElement('div');


        const wrapperIconWrapper = document.createElement('div');
        wrapperIconWrapper.classList.add('as_featured_wrapper');
        wrapperIconWrapper.style.position = 'relative';
        wrapperIconWrapper.innerHTML = '<div style="position: absolute; width: 32px; height: 32px; right: -40px; top: 0.8em">' + this.getIcon(true) + '</div>';

        wrapper.append(wrapperIconWrapper);
        wrapper.append(blockContent);

        return wrapper;
    }

    getIcon(display_none) {
        var display_none_style = "";
        if (display_none) {
            display_none_style = "display: none;";
        }
        var icon = '<svg style="color: rgb(128, 128, 128); ' + display_none_style + '" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"> <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" fill="#808080"></path> </svg>';
        return icon;
    }

    static get isTune() {
        return true;
    }
}