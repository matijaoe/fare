<script lang="ts" setup>

</script>

<template>
  <LayoutSectionWrapper pb-18>
    <div relative>
      <DateSwitchHeader mb-6 />

      <div
        w-full
        flex="~ col md:row"
        justify-between
        gap-8
        mt-8
      >
        <div
          max-w="full sm:base md:lg lg:2xl"
          flex-1
        >
          <LedgerEntriesList />
        </div>
        <div
          text="right"
          flex-1
        >
          <FCard>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel dicta amet veniam, vero iure neque incidunt dolorem, minima beatae obcaecati molestias, omnis dolor repellendus consectetur numquam hic fugit in nemo.
            Soluta, cumque saepe corrupti iure officiis repudiandae omnis, voluptatibus autem accusamus vitae consequatur voluptas sunt, rem quas nemo laudantium placeat? Voluptatibus rerum beatae hic illo nisi sint obcaecati doloremque nihil!
            Perferendis repellat impedit deserunt nisi. Hic ipsa omnis delectus consequatur iste id, dolor porro molestiae voluptatibus. Ea amet laboriosam neque, minima assumenda unde nam aliquam possimus nulla. Saepe, eaque autem?
            Debitis non officiis tempora fuga reiciendis? Repudiandae, ea pariatur ullam voluptatum eaque blanditiis nemo minima eligendi et esse. Labore ad voluptatem error delectus sunt suscipit ratione, fugit illum expedita velit.
            Eum qui ducimus dolores sapiente quae eius labore explicabo ex exercitationem, porro commodi id nesciunt fuga, ab magnam! Magnam sequi sit provident? Odit recusandae commodi totam nulla! Iusto, eos facilis!
            Dolores, repellendus cumque dolore laboriosam a ea fugiat id optio recusandae nobis veritatis vero assumenda incidunt quae odit, magnam dolorum eaque ipsam quos, voluptas ad? Voluptatum voluptates possimus suscipit vitae.
            Magni labore eveniet reiciendis rem harum vitae, natus delectus nostrum voluptate perspiciatis repudiandae, vero aliquid adipisci et praesentium impedit quisquam possimus atque omnis vel repellendus aperiam! Eligendi sunt maiores quidem.
            Soluta quibusdam sequi architecto cupiditate in, ut explicabo quasi, aut est cumque nihil vel fugiat blanditiis molestias non? Voluptates earum magni tempore, rerum perferendis expedita error neque qui asperiores iusto!
            Odit laudantium velit cum sunt esse repellat, harum aut, consequatur, vero pariatur consectetur ea sapiente quos minus asperiores nam temporibus molestiae deleniti reiciendis quasi perferendis nostrum. Adipisci cum necessitatibus fugiat!
            Blanditiis explicabo ipsum a qui at sit fugit cupiditate ipsam tempore tempora nemo ducimus minus accusantium, sapiente porro vero, perferendis dolor doloremque eaque dolores laborum quod iure natus. Ab, quis!
          </FCard>
        </div>
      </div>

      <LedgerAddEntryBar
        fixed
        pos="bottom-6 right-6"
      />
    </div>
  </LayoutSectionWrapper>
</template>
